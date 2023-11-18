import Cookies from "js-cookie";
import "./home.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [shownav, setShowNav] = useState(false);
  const [animation, setAniamtion] = useState("");

  const isUser = Cookies.get("jwt_isuser");

  return (
    <>
      <ToastContainer />
      <div className="nav-bar">
        <div className="Logo">
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            Rush Munch
          </h1>
        </div>
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </li>
          <li>
            {isUser === undefined ? (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                type="button"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => {
                  toast.success("Logged Out", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });

                  Cookies.remove("jwt_isuser");
                  window.location.reload();
                }}
                type="button"
              >
                Log Out
              </button>
            )}
          </li>
        </ul>
        <div
          onClick={() => {
            setShowNav(true);
            setAniamtion("nav-bar-mobile1");
          }}
          className="nav-buttons-con"
        >
          <div className="ham-con"></div>
          <div className="ham-con"></div>
          <div className="ham-con"></div>
        </div>
      </div>
      <div className={shownav ? animation : "d-none"}>
        <button
          onClick={() => {
            setAniamtion("nav-bar-mobile2");
            setTimeout(() => {
              setShowNav(false);
            }, 2000);
          }}
          type="button"
        >
          ›
        </button>
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </li>
          <li>
            {isUser === undefined ? (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                type="button"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => {
                  toast.success("Logged Out", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  Cookies.remove("jwt_isuser");
                }}
                type="button"
              >
                Log Out
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
