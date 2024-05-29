import { getIcon } from "@/utils/getIcon";
import { FlexGrid, FlexGridCellTemplate } from "@mescius/wijmo.react.grid";
import { FlexGrid as FlexGridType } from "@mescius/wijmo.grid";
import { ICellTemplateContext, CellType } from "@mescius/wijmo.grid";
type Props = {
  itemsSource: any[];
};
export default function ResultsView({ itemsSource }: Props) {
  const columns = [
    {
      binding: "message",
      header: "メッセージ",
      width: "*",
    },
  ];

  const onInit = (grid: FlexGridType) => {
    grid.itemFormatter = function (panel, r, c, cell) {
      if (panel.cellType == CellType.RowHeader) {
        const item = grid.collectionView.items[r];
        cell.innerHTML = getIcon(item.type);
        cell.style.verticalAlign = "middle";
        cell.style.fontSize = "16px";
      }
    };
  };
  return (
    <>
      <FlexGrid
        itemsSource={itemsSource}
        columns={columns}
        autoGenerateColumns={false}
        initialized={onInit}
      >
        <FlexGridCellTemplate cellType="RowHeader" />
      </FlexGrid>
    </>
  );
}
