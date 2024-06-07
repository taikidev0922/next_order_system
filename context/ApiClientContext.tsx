import apiClient from "@/lib/apiClient";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useLoadingContext } from "./LoadingContext";
import { useDialogContext } from "./dialogContext";

interface ApiClientContextProps {}

export const ApiClientContext = createContext<ApiClientContextProps>({});

export const useApiClient = () => useContext(ApiClientContext);

export const ApiClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { startLoading, stopLoading } = useLoadingContext();
  const { showDialog } = useDialogContext();
  apiClient.interceptors.request.use(
    (config) => {
      startLoading();
      const token = Cookies.get("token");
      if (token && config.url && !config.url.includes("/login")) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => {
      stopLoading();
      return response;
    },
    (error) => {
      stopLoading();
      //   if (error.response.status === 400) {
      //     showDialog({
      //       text: "ユーザーIDまたはパスワードが間違っています",
      //       type: "error",
      //     });
      //   }
      if (error.response.status === 500) {
        showDialog({
          text: "システムエラーが発生しました",
          type: "error",
        });
      }
      return Promise.reject(error);
    },
  );
  return (
    <ApiClientContext.Provider value={{}}>{children}</ApiClientContext.Provider>
  );
};
