"use client";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import "@mescius/wijmo.styles/wijmo.css";
import { LoadingProvider } from "@/context/LoadingContext";
import { ApiClientProvider } from "@/context/ApiClientContext";
import { DialogProvider } from "@/context/dialogContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <DialogProvider>
            <LoadingProvider>
              <ApiClientProvider>{children}</ApiClientProvider>
            </LoadingProvider>
          </DialogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
