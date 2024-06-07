import { createContext, useContext, useEffect, useState } from "react";

/**
 * 操作種別
 * create: 新規
 * update: 編集
 * delete: 削除
 * view: 参照
 */
export type Action =
  | "create"
  | "update"
  | "delete"
  | "view"
  | "createAndUpdate";

interface ActionContextProps {
  currentAction: Action;
  setCurrentAction: (action: Action) => void;
  isReadOnlyAction: boolean;
  isEditable: boolean;
}

const editableAction: Action[] = ["create", "update", "createAndUpdate"];
const readOnlyAction: Action[] = ["view", "delete"];

const ActionContext = createContext<ActionContextProps>({
  currentAction: "view",
  setCurrentAction: () => {},
  isReadOnlyAction: false,
  isEditable: false,
});

export const useActionContext = () => {
  const action = useContext(ActionContext);
  return action;
};

export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAction, setCurrentAction] = useState<Action>("view");
  const [isReadOnlyAction, setIsReadOnlyAction] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  useEffect(() => {
    setIsReadOnlyAction(readOnlyAction.includes(currentAction));
    setIsEditable(editableAction.includes(currentAction));
  }, [currentAction]);
  return (
    <ActionContext.Provider
      value={{ currentAction, setCurrentAction, isReadOnlyAction, isEditable }}
    >
      {children}
    </ActionContext.Provider>
  );
};
