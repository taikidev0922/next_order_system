import { getIcon } from "@/utils/getIcon";
import { FlexGrid, FlexGridCellTemplate } from "@mescius/wijmo.react.grid";
import { FlexGrid as FlexGridType } from "@mescius/wijmo.grid";
import { CellType } from "@mescius/wijmo.grid";
import { createHtmlFromComponent } from "@/utils/createHtmlFromComponent";
import MessageIcon from "../MessageIcon/MessageIcon";
type Props = {
  itemsSource: any[];
};
export default function ResultsView({ itemsSource }: Props) {
  const columns = [
    {
      binding: "message",
      header: "メッセージ",
      width: "*",
      cssClass: "wj-readonly",
    },
  ];

  const onInit = (grid: FlexGridType) => {
    grid.itemFormatter = function (panel, r, c, cell) {
      if (panel.cellType == CellType.RowHeader) {
        const item = grid.collectionView.items[r];
        cell.innerHTML = createHtmlFromComponent(
          <MessageIcon type={item.type} />,
          "cell",
        ) as string;
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
        isReadOnly={true}
      >
        <FlexGridCellTemplate cellType="RowHeader" />
      </FlexGrid>
    </>
  );
}
