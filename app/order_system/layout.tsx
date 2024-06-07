"use client";
import { useState } from "react";
import "../globals.css";
import "@mescius/wijmo.styles/wijmo.css";
import Header from "@/components/Header/Header";
import { ToastProvider } from "@/context/ToastContext";
import { ActionProvider } from "@/context/ActionContext";
import { CardProvider } from "@/context/CardContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      <Header title="" isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <main
        className={`-slate-100 transition-all duration-300 ease-in-out ${
          isNavOpen ? "translate-x-64" : ""
        }`}
        style={{ width: isNavOpen ? "calc(100% - 16rem)" : "100%" }}
      >
        <ActionProvider>
          <CardProvider>
            <ToastProvider>{children}</ToastProvider>
          </CardProvider>
        </ActionProvider>
      </main>
    </div>
  );
}
