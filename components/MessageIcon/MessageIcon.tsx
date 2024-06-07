import { FaI, FaU, FaD, FaW } from "react-icons/fa6";
import { MdError } from "react-icons/md";

interface MessageIconProps {
  type: "insert" | "update" | "delete" | "error" | "warning";
}

export default function MessageIcon({ type }: MessageIconProps) {
  return (
    <div className="flex items-center justify-center h-full">
      {type === "insert" && <FaI color="white" />}
      {type === "update" && <FaU color="white" />}
      {type === "delete" && <FaD color="white" />}
      {type === "error" && <MdError color="red" />}
      {type === "warning" && <FaW color="white" />}
    </div>
  );
}
