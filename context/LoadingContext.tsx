"use client";

import React, { createContext, useContext, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

interface LoadingContextType {
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    console.log("stopLoading");
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            opacity: isLoading ? 0.3 : 0,
            transition: "opacity 0.5s ease-in-out",
            animation: "fadeout 6s",
            zIndex: 1000,
          }}
        >
          <PacmanLoader
            loading={isLoading}
            size={30}
            aria-label="Loading Spinner"
            color="blue"
          />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
