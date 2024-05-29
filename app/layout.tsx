"use client";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import "@mescius/wijmo.styles/wijmo.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
