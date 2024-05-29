import { ICellTemplateFunction } from "@mescius/wijmo.grid";
export type GridColumn = {
  binding: string;
  header: string;
  dataType: "string" | "number" | "boolean" | "date";
  isReadOnly?: boolean;
  width?: number;
  cssClass?: string;
  cellTemplate?: ICellTemplateFunction;
};
