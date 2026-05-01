import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import Gallery from "./Gallery.jsx";

function RouterSwitch() {
  const path = window.location.pathname;

  if (path === "/gallery" || path === "/gallery/") {
    return <Gallery />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterSwitch />
  </StrictMode>
);