import { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

type ToastOptions = {
  text: string;
  type: "success" | "error";
};

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function useToastContext() {
  return useContext(ToastContext);
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showToast = (options: ToastOptions) => {
    if (options.type === "success") {
      toast.success(options.text);
    } else {
      toast.error(options.text);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
};
