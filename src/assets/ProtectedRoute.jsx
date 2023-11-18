import { Navigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

import Cookies from "js-cookie";
import Cart from "./cart";

const ProtectedRoute = () => {
  const isUser = Cookies.get("jwt_isuser");

  const location = useLocation();

  if (isUser !== undefined) {
    if ((location.pathname = "/cart")) {
      return <Cart />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
