import "./home.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [shownav, setShowNav] = useState(false);
  const [animation, setAniamtion] = useState("");

  return (
    <>
      <div className="nav-bar">
        <div className="Logo">
          <h1>Rush Munch</h1>
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
            <button type="button">LogIn</button>
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
            <button type="button">LogIn</button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
