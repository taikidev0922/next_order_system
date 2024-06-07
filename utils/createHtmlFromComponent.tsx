"use client";
import { createRoot } from "react-dom/client";
import ReactDOMServer from "react-dom/server";

export function createHtmlFromComponent(
  component: React.ReactNode,
  type: "dialog" | "cell",
) {
  if (type === "cell") {
    const htmlString = ReactDOMServer.renderToString(component);
    return htmlString;
  }

  const wrapper = document.createElement("div");
  const root = createRoot(wrapper);
  root.render(component);
  return wrapper;
}
