import React, { createContext, useContext, useState } from "react";

interface CardContextType {
  toggleCard: () => void;
  setResizeGrid: (resizeGrid: () => void) => void;
}

const CardContext = createContext<CardContextType | undefined>({
  toggleCard: () => {},
  setResizeGrid: () => {},
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [resizeGrid, setResizeGrid] = useState<() => void>();
  const toggleCard = () => {
    resizeGrid?.();
  };

  return (
    <CardContext.Provider value={{ toggleCard, setResizeGrid }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCard must be used within an CardProvider");
  }
  return context;
};
