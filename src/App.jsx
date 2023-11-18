import "./App.css";

import { useEffect } from "react";

import Cookies from "js-cookie";

import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./assets/HomePage";
import NotFound from "./assets/NotFound";
import Items from "./assets/Items";
import Login from "./assets/login";
import ProtectedRoute from "./assets/ProtectedRoute";
import SignUp from "./assets/signup";

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

  useEffect(() => {
    const isUser = Cookies.get("jwt_isuser");
    if (isUser === undefined) {
      localStorage.removeItem("cartItems");
    }
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/items/:restrauntId" element={<Items />} />
      <Route path="/cart" element={<ProtectedRoute />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App;
