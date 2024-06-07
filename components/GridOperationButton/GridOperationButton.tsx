import { FaCopy, FaPlus, FaMinus, FaFileExcel } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";

type GridOperationButtonType = "add" | "delete" | "copy" | "clear" | "export";

interface GridOperationButtonProps {
  onClick: () => void;
  type: GridOperationButtonType;
  disabled?: boolean;
}

const iconConfig: Record<GridOperationButtonType, React.ReactNode> = {
  add: <FaPlus />,
  delete: <FaMinus />,
  copy: <FaCopy />,
  clear: <MdFilterAltOff />,
  export: <FaFileExcel />,
};

export default function GridOperationButton({
  onClick,
  type,
  disabled,
}: GridOperationButtonProps) {
  return (
    <div>
      <button
        className="text-white p-2 rounded bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed"
        onClick={onClick}
        disabled={disabled}
      >
        {iconConfig[type]}
      </button>
    </div>
  );
}
