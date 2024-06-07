"use client";
import { FlexGrid, FlexGridCellTemplate } from "@mescius/wijmo.react.grid";
import {
  FlexGrid as FlexGridType,
  ICellTemplateContext,
} from "@mescius/wijmo.grid";
import { useEffect, useState } from "react";
import { useCardContext } from "@/context/CardContext";
import { FaCopy, FaPlus, FaMinus, FaFileExcel } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import GridOperationButton from "../GridOperationButton/GridOperationButton";
import { useActionContext } from "@/context/ActionContext";

interface GridFormProps {
  itemsSource: any[];
  onInit: (grid: FlexGridType) => void;
  addRow: () => void;
  deleteRow: () => void;
  copyRow: () => void;
  clearFilter: () => void;
  exportExcel: () => void;
  isActive: boolean;
}

export default function GridForm({
  itemsSource,
  onInit,
  addRow,
  deleteRow,
  copyRow,
  clearFilter,
  exportExcel,
  isActive,
}: GridFormProps) {
  const { setResizeGrid } = useCardContext();
  const { isEditable } = useActionContext();
  const [gridHeight, setGridHeight] = useState<number>(
    window.innerHeight - 330,
  );
  const resizeGrid = () => {
    const top = document.querySelector(".flex-grid")?.getClientRects()[0]?.top;
    const updateGridHeight = () => {
      setGridHeight(window.innerHeight - (top ?? 0) - 90);
    };
    window.addEventListener("resize", updateGridHeight);
    updateGridHeight();
  };
  useEffect(() => {
    setResizeGrid(() => {
      return () => {
        setTimeout(() => {
          resizeGrid();
        });
      };
    });
    resizeGrid();
  }, []);
  return (
    <div className={isActive ? "wj-active-grid-wrapper" : ""}>
      <FlexGrid
        itemsSource={itemsSource}
        initialized={onInit}
        style={{ height: gridHeight }}
        className="flex-grid"
      >
        <FlexGridCellTemplate
          cellType="RowHeader"
          template={(context: ICellTemplateContext) => {
            return `${context.row.index + 1}`;
          }}
        />
      </FlexGrid>
      <div className="flex gap-2">
        <GridOperationButton
          onClick={addRow}
          type="add"
          disabled={!isEditable}
        />
        <GridOperationButton
          onClick={copyRow}
          type="copy"
          disabled={!isEditable}
        />
        <GridOperationButton
          onClick={deleteRow}
          type="delete"
          disabled={!isEditable}
        />
        <GridOperationButton onClick={clearFilter} type="clear" />
        <GridOperationButton onClick={exportExcel} type="export" />
      </div>
    </div>
  );
}
