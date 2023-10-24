import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./assets/HomePage";
import NotFound from "./assets/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
