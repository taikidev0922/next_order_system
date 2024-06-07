import { useKeyboardShortcuts } from "@/hook/useKeyboardShortcuts";
import Button from "../Button/Button";
import { useDialogContext } from "@/context/dialogContext";
import { Action, useActionContext } from "@/context/ActionContext";

interface ActionHeaderProps {
  actions: Action[];
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function ActionHeader({
  actions,
  onUpdate,
  onDelete,
}: ActionHeaderProps) {
  const { showDialog } = useDialogContext();
  const { currentAction, setCurrentAction, isEditable } = useActionContext();
  const actionsConfig: { key: Action; label: string; color: string }[] = [
    {
      key: "update",
      label: "編集する",
      color: "bg-blue-200",
    },
    {
      key: "createAndUpdate",
      label: "登録・編集する",
      color: "bg-blue-200",
    },
    {
      key: "delete",
      label: "削除する",
      color: "bg-red-200",
    },
    {
      key: "view",
      label: "参照する",
      color: "",
    },
  ];
  const confirmUpdate = () => {
    if (!isEditable) {
      return;
    }
    showDialog({
      text: "更新しますか？",
      type: "confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate?.();
      }
    });
  };
  const confirmDelete = () => {
    if (currentAction !== "delete") {
      return;
    }
    showDialog({
      text: "削除しますか？",
      type: "confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete?.();
      }
    });
  };
  useKeyboardShortcuts([
    {
      keys: "Alt+S",
      action: confirmUpdate,
    },
    {
      keys: "Alt+D",
      action: confirmDelete,
    },
  ]);

  return (
    <div
      className={`border border-gray-300 flex items-center gap-2 px-2 h-10 ${
        actionsConfig.find((a) => a.key === currentAction)?.color
      }`}
    >
      {actions.map((action) => (
        <div key={action}>
          <input
            id={action}
            type="radio"
            className="mx-1 cursor-pointer"
            checked={currentAction === action}
            onChange={() => setCurrentAction(action)}
          />
          <label htmlFor={action} className="cursor-pointer">
            {actionsConfig.find((a) => a.key === action)?.label}
          </label>
        </div>
      ))}
      <Button
        text="更新 Alt+S"
        onClick={confirmUpdate}
        className="btn-success ml-auto"
        disabled={!isEditable}
      />
      <Button
        text="削除 Alt+D"
        onClick={confirmDelete}
        className="btn-error"
        disabled={currentAction !== "delete"}
      />
    </div>
  );
}
