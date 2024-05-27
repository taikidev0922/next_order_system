"use client";
import { createRoot } from "react-dom/client";

export function createHtmlFromComponent(component: React.ReactNode) {
  const wrapper = document.createElement("div");
  const root = createRoot(wrapper);
  root.render(component);
  return wrapper;
}
