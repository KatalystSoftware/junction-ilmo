import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StageProvider } from "./components/stage-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StageProvider>
      <App />
    </StageProvider>
  </React.StrictMode>,
);
