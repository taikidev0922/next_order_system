"use client";
import { useState } from "react";
import "../globals.css";
import "@mescius/wijmo.styles/wijmo.css";
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <Header title="" isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <main
          className={`-slate-100 transition-all duration-300 ease-in-out ${
            isNavOpen ? "translate-x-64" : ""
          }`}
          style={{ width: isNavOpen ? "calc(100% - 16rem)" : "100%" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
