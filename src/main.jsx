import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Gallery from "./Gallery.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  </BrowserRouter>
);