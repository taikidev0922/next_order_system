"use client";
import { GridColumn } from "@/types/GridColumn";
import { useEffect, useState } from "react";
import { FlexGrid, KeyAction, SelectionMode } from "@mescius/wijmo.grid";
import { FlexGridXlsxConverter } from "@mescius/wijmo.grid.xlsx";
import { DataType } from "@mescius/wijmo";
import { CellMaker } from "@mescius/wijmo.grid.cellmaker";
import { FlexGridFilter } from "@mescius/wijmo.grid.filter";
import _assign from "lodash/assign";
import { useDialogContext } from "@/context/dialogContext";
import { getIcon } from "@/utils/getIcon";
import { createHtmlFromComponent } from "@/utils/createHtmlFromComponent";
import MessageIcon from "@/components/MessageIcon/MessageIcon";
import { useActionContext } from "@/context/ActionContext";

const dataTypeMap = {
  string: DataType.String,
  number: DataType.Number,
  boolean: DataType.Boolean,
  date: DataType.Date,
};

export function useGridForm({
  columns,
  name,
}: {
  columns: GridColumn[];
  name: string;
}) {
  const initialItems = Array.from({ length: 10 }, () => ({
    isSelected: false,
  }));
  const [itemsSource, setItemsSource] = useState<any[]>(initialItems);
  const [grid, setGrid] = useState<FlexGrid>();
  const [filter, setFilter] = useState<FlexGridFilter>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { showResultsDialog } = useDialogContext();
  const { currentAction, isReadOnlyAction } = useActionContext();
  useEffect(() => {
    if (!grid) return;
    renderGrid(grid);
  }, [grid, itemsSource]);
  useEffect(() => {
    if (isReadOnlyAction) {
      setItemsSource([]);
      return;
    }
    setItemsSource(initialItems);
  }, [currentAction, isReadOnlyAction]);
  const rowHeaders: GridColumn[] = [
    {
      binding: "isSelected",
      header: " ",
      dataType: "boolean",
      width: 35,
      cssClass: "wj-header",
    },
    {
      binding: "operation",
      header: " ",
      dataType: "string",
      width: 35,
      isReadOnly: true,
      cssClass: "wj-operation-cell",
      cellTemplate(ctx, cell) {
        if (!cell) return "";
        if (!ctx.item.updated || currentAction === "view") {
          cell.style.backgroundColor = "#eee";
          cell.style.borderBottom = "";
          return "";
        }

        const actionConfig: Record<
          string,
          { iconType: "delete" | "update" | "insert"; color: string }
        > = {
          delete: { iconType: "delete", color: "#f44336" },
          update: { iconType: "update", color: "#4CAF50" },
          insert: { iconType: "insert", color: "#1976d2" },
        };

        const actionType = ctx.item.id ? "update" : "insert";
        const { iconType, color } =
          currentAction === "delete"
            ? actionConfig.delete
            : actionConfig[actionType];

        const html = createHtmlFromComponent(
          <MessageIcon type={iconType} />,
          "cell",
        );
        cell.style.backgroundColor = color;
        cell.style.borderBottom = "1px solid #eee";
        return html as string;
      },
    },
    {
      binding: "results",
      header: " ",
      dataType: "string",
      width: 35,
      cssClass: "wj-header",
      cellTemplate(ctx, cell) {
        if (!ctx.item.results || ctx.item.results.length === 0) return "";
        return CellMaker.makeButton({
          text: createHtmlFromComponent(
            <MessageIcon type="error" />,
            "cell",
          ) as string,
          click(clickCell, clickCtx) {
            showResultsDialog(clickCtx.item.results);
          },
        })(ctx, cell);
      },
    },
  ];

  const extendedColumns = columns.map((column) => ({
    ...column,
    cssClass:
      column.cssClass +
      (column.isReadOnly || isReadOnlyAction ? " wj-readonly" : ""),
    isReadOnly: column.isReadOnly || isReadOnlyAction,
  }));

  const renderGrid = (_grid: FlexGrid) => {
    _grid.initialize({
      itemsSource: itemsSource,
      autoGenerateColumns: false,
      columns: rowHeaders.concat(extendedColumns).map((column) => ({
        ...column,
        dataType: dataTypeMap[column.dataType],
      })),
    });
  };

  const getSelectedItems = () => {
    grid?.collectionView.items.forEach((item, index) => {
      item.cookie = index;
    });
    return grid?.collectionView.items
      .filter((item) => item.isSelected)
      .map((item) => ({
        ...item,
        operation: currentAction === "delete" ? "delete" : "save",
      }));
  };

  const onInit = (flexGrid: FlexGrid) => {
    if (!flexGrid.collectionView) return;
    setGrid(flexGrid);
    renderGrid(flexGrid);
    setFilter(
      new FlexGridFilter(flexGrid, {
        filterColumns: columns.map((column) => column.binding),
      }),
    );
    flexGrid.keyActionEnter = KeyAction.CycleEditable;
    flexGrid.keyActionTab = KeyAction.CycleEditable;
    flexGrid.selectionMode = SelectionMode.Row;
    flexGrid?.itemsSourceChanged.addHandler(() => {
      flexGrid.deferUpdate(() => {
        flexGrid.collectionView?.items?.forEach((item) => {
          item.isSelected = false;
        });
      });
    });
    flexGrid.cellEditEnded.addHandler((_, args) => {
      flexGrid.beginUpdate();
      flexGrid.collectionView.items[args.row].updated = true;
      flexGrid.endUpdate();
      if (args.getColumn().binding === "isSelected") return;
      flexGrid.beginUpdate();
      flexGrid.collectionView.items[args.row].isSelected = true;
      flexGrid.endUpdate();
    });
    flexGrid.selectionChanged.addHandler((_, args) => {
      if (args.col === 0) {
        flexGrid.select(args.row, 3);
      }
    });
    flexGrid.gotFocus.addHandler(() => {
      setIsActive(true);
    });
    flexGrid.lostFocus.addHandler(() => {
      setIsActive(false);
    });
    flexGrid.hostElement.addEventListener("keydown", (e) => {
      if (
        e.shiftKey &&
        (e.key === "Enter" || e.key === "Tab") &&
        flexGrid.selection.col === 2
      ) {
        flexGrid.select(flexGrid.selection.row - 1, columns.length + 2);
      }
      if (e.key === "ArrowLeft" && flexGrid.selection.col === 2) {
        flexGrid.select(flexGrid.selection.row, 3);
      }
    });
    flexGrid.hostElement.addEventListener("click", (e) => {
      const hit = flexGrid.hitTest(e);
      if (hit.col === 0 || hit.col === 1 || hit.col === 2) {
        flexGrid.select(hit.row, 3);
      }
    });
  };

  const setResults = (results: any[]) => {
    grid?.beginUpdate();
    grid?.collectionView.items.forEach((item) => {
      item.results = undefined;
    });
    results.forEach((result) => {
      const target = grid?.collectionView.items.find(
        (item) => item.cookie === result.cookie,
      );
      if (!target) return;
      if (currentAction === "delete") {
        grid?.editableCollectionView.remove(target);
        return;
      }
      if (result.results) {
        target.results = result.results;
        return;
      }
      target.isSelected = false;
      target.results = undefined;
      target.updated = false;
      _assign(target, result);
    });
    grid?.endUpdate();
  };

  const addRow = () => {
    grid?.collectionView.sourceCollection.splice(grid.selection.row + 1, 0, {
      isSelected: false,
    });
    grid?.collectionView.refresh();
    grid?.focus();
    grid?.select(grid.selection.row + 1, grid.selection.col);
  };

  const deleteRow = () => {
    if (grid?.collectionView?.currentItem?.id) return;
    if (!grid?.collectionView?.currentItem) return;
    grid?.collectionView.sourceCollection.splice(grid.selection.row, 1);
    grid?.collectionView.refresh();
  };

  const copyRow = () => {
    if (!grid) return;
    addRow();
    grid?.beginUpdate();
    _assign(
      grid?.collectionView.currentItem,
      grid?.collectionView.items[grid.selection.row - 1],
    );
    grid.collectionView.currentItem.id = null;
    grid.collectionView.currentItem.isSelected = true;
    grid?.endUpdate();
  };

  const clearFilter = () => {
    filter?.clear();
  };

  const exportExcel = () => {
    FlexGridXlsxConverter.saveAsync(
      grid as FlexGrid,
      {
        includeColumnHeaders: true,
        includeStyles: false,
        includeRowHeaders: false,
        includeColumns: function (column) {
          return !["isSelected", "operation"].includes(column.binding ?? "");
        },
      },
      `${name}.xlsx`,
    );
  };

  const gridRegister = () => {
    return {
      onInit,
      itemsSource,
      addRow,
      deleteRow,
      copyRow,
      clearFilter,
      exportExcel,
      isActive,
    };
  };
  return {
    gridRegister,
    setItemsSource,
    getSelectedItems,
    setResults,
  };
}
