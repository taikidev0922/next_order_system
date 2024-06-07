import { useCardContext } from "@/context/CardContext";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { toggleCard } = useCardContext();

  const onToggle = () => {
    setIsOpen(!isOpen);
    toggleCard();
  };

  return (
    <div>
      <div className="border-b bg-gray-500 flex px-2 h-7 items-center">
        <span className="text-white">{title}</span>
        <div className="ml-auto">
          <button onClick={onToggle}>
            {isOpen ? (
              <FaAngleUp color="white" size={20} />
            ) : (
              <FaAngleDown color="white" size={20} />
            )}
          </button>
        </div>
      </div>
      <div className="p-3" style={{ display: isOpen ? "block" : "none" }}>
        {children}
      </div>
    </div>
  );
}
