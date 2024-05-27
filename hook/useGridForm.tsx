"use client";
import { GridColumn } from "@/types/GridColumn";
import { useState } from "react";
import { FlexGrid } from "@mescius/wijmo.grid";
import { CellMaker } from "@mescius/wijmo.grid.cellmaker";
import _assign from "lodash/assign";
import { useDialogContext } from "@/context/dialogContext";
import ResultsView from "@/components/ResultsView/ResultsView";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { createHtmlFromComponent } from "@/utils/createHtmlFromComponent";
import Icon from "@/components/Icon/Icon";

export function useGridForm({ columns }: { columns: GridColumn[] }) {
  const [itemsSource, setItemsSource] = useState<any[]>([]);
  const [grid, setGrid] = useState<FlexGrid>();
  const { showResultsDialog } = useDialogContext();
  const extendedColumns: GridColumn[] = [
    {
      binding: "isSelected",
      header: " ",
      dataType: "boolean",
      width: 35,
    },
    {
      binding: "operation",
      header: " ",
      dataType: "string",
      width: 35,
      isReadOnly: true,
      cellTemplate(ctx, cell) {
        if (!cell) return "";
        cell.style.color = "white";
        cell.style.fontSize = "24px";
        cell.style.textAlign = "center";
        if (!ctx.item.isSelected || !cell) {
          cell.style.backgroundColor = "";
          return "";
        }
        if (ctx.item.id) {
          cell.style.backgroundColor = "#0aff0a";
          return "U";
        }
        cell.style.backgroundColor = "#0a84ff";
        return "I";
      },
    },
    {
      binding: "results",
      header: " ",
      dataType: "string",
      width: 30,
      cellTemplate(ctx, cell) {
        if (!ctx.item.results || ctx.item.results.length === 0) return "";
        const icon = createHtmlFromComponent(<Icon />);
        console.log(icon);
        return CellMaker.makeButton({
          text: ctx.item.results.some((result) => result.type === "error")
            ? icon
            : "w",
          click(clickCell, clickCtx) {
            showResultsDialog(clickCtx.item.results);
          },
          attributes: {
            class: "btn btn-primary",
          },
        })(ctx, cell);
      },
    },
  ];

  const getSelectedItems = () => {
    grid?.collectionView.items.forEach((item, index) => {
      item.cookie = index;
    });
    return grid?.collectionView.items
      .filter((item) => item.isSelected)
      .map((item) => ({
        ...item,
        operation: "save",
      }));
  };

  const onInit = (flexGrid: FlexGrid) => {
    setGrid(flexGrid);
    setItemsSource(Array.from({ length: 10 }, () => ({})));
    flexGrid?.itemsSourceChanged.addHandler(() => {
      flexGrid.deferUpdate(() => {
        flexGrid.collectionView.items.forEach((item) => {
          item.isSelected = false;
        });
      });
    });
    flexGrid.cellEditEnded.addHandler((_, args) => {
      if (args.getColumn().binding === "isSelected") return;
      flexGrid.beginUpdate();
      flexGrid.collectionView.items[args.row].isSelected = true;
      flexGrid.endUpdate();
    });
  };

  const setResults = (results: any[]) => {
    grid?.beginUpdate();
    results.forEach((result) => {
      const target = grid?.collectionView.items[result.cookie];
      if (!target) return;
      if (result.results) {
        target.results = result.results;
        return;
      }
      target.isSelected = false;
      target.results = undefined;
      _assign(target, result);
    });
    grid?.endUpdate();
  };

  const gridRegister = () => {
    return {
      columns: extendedColumns.concat(columns),
      itemsSource,
      onInit,
    };
  };
  return {
    gridRegister,
    setItemsSource,
    getSelectedItems,
    setResults,
  };
}
