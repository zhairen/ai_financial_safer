import React from "react";
import { createRoot } from "react-dom/client";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
