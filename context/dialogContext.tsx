"use client";
import ResultsView from "@/components/ResultsView/ResultsView";
import { createHtmlFromComponent } from "@/utils/createHtmlFromComponent";
import { createContext, useContext } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

export type Dialog = {
  text: string;
  type: "confirm" | "warning" | "error";
};

const titleConfig: Record<Dialog["type"], string> = {
  confirm: "確認",
  warning: "警告",
  error: "エラー",
};

interface DialogContextType {
  showDialog: (toast: Dialog) => Promise<SweetAlertResult<any>>;
  showResultsDialog: (results: any) => Promise<SweetAlertResult<any>>;
}

const DialogContext = createContext<DialogContextType>({
  showDialog: () => Promise.resolve({} as SweetAlertResult<any>),
  showResultsDialog: () => Promise.resolve({} as SweetAlertResult<any>),
});

export function useDialogContext() {
  return useContext(DialogContext);
}

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const showDialog = (_dialog: Dialog) => {
    return Swal.fire({
      title: titleConfig[_dialog.type],
      text: _dialog.text,
      showConfirmButton: _dialog.type !== "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "はい",
      cancelButtonText: _dialog.type === "error" ? "閉じる" : "いいえ",
    });
  };
  const showResultsDialog = (results: any) => {
    const wrapper = createHtmlFromComponent(
      <ResultsView itemsSource={results} />,
      "dialog",
    );

    return Swal.fire({
      title: "エラー",
      html: wrapper,
      confirmButtonColor: "#808080",
      confirmButtonText: "閉じる",
    });
  };
  return (
    <DialogContext.Provider value={{ showDialog, showResultsDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
