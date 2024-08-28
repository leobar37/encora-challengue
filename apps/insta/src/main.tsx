import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const renderApp = () =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  import("@myorg/insta-mock").then(({ startWorker }) => {
    startWorker().then(() => renderApp());
  });
} else {
  renderApp();
}
