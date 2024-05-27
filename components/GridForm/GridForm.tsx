"use client";
import { FlexGrid, FlexGridCellTemplate } from "@mescius/wijmo.react.grid";
import {
  FlexGrid as FlexGridType,
  ICellTemplateContext,
} from "@mescius/wijmo.grid";
import { DataType } from "@mescius/wijmo";
import { GridColumn } from "@/types/GridColumn";

interface GridFormProps {
  itemsSource: any[];
  columns: GridColumn[];
  onInit: (grid: FlexGridType) => void;
}

const dataTypeMap = {
  string: DataType.String,
  number: DataType.Number,
  boolean: DataType.Boolean,
  date: DataType.Date,
};

export default function GridForm({
  itemsSource,
  columns,
  onInit,
}: GridFormProps) {
  return (
    <div>
      <FlexGrid
        initialized={onInit}
        itemsSource={itemsSource}
        columns={columns.map((column) => ({
          ...column,
          dataType: dataTypeMap[column.dataType],
        }))}
        autoGenerateColumns={false}
      >
        <FlexGridCellTemplate
          cellType="RowHeader"
          template={(context: ICellTemplateContext) => {
            return `${context.row.index + 1}`;
          }}
        />
      </FlexGrid>
    </div>
  );
}
