import "./App.css";

import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import HomePage from "./assets/HomePage";
import NotFound from "./assets/NotFound";

function App() {
  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector("meta[name=viewport]")
        .setAttribute(
          "content",
          "height=" +
            window.screen.height * 0.9 +
            "px, width=device-width, initial-scale=1.0"
        );
    }, 300);
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
