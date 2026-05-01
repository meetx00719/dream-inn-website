import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import Gallery from "./Gallery.jsx";

const path = window.location.pathname;

function RouterSwitch() {
  if (path === "/gallery") {
    return <Gallery />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterSwitch />
  </StrictMode>
);