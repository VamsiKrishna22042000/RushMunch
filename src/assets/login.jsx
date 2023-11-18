import "./login.css";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({ userName: "", password: "" });

  const userNameCookie = Cookies.get("jwt_username");
  const userPasswordCookie = Cookies.get("jwt_password");
  const [load, setLoad] = useState(false);

  return (
    <>
      <ToastContainer />
      <div className="login-con">
        {load ? (
          <div id="spinner">
            <TailSpin color="maroon" height={50} width={50} />
          </div>
        ) : (
          <div>
            <h2>Rush Munch</h2>
            <div>
              <p>USERNAME</p>
              <input
                type="text"
                onChange={(e) => {
                  setLoginUser({ ...loginUser, userName: e.target.value });
                }}
              />
              <p>PASSWORD</p>
              <input
                type="password"
                onChange={(e) => {
                  setLoginUser({ ...loginUser, password: e.target.value });
                }}
              />
              <button
                onClick={() => {
                  if (loginUser.userName === "") {
                    toast.error("Enter UserName", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  } else if (loginUser.password === "") {
                    toast.error("Enter Password", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  } else {
                    setLoad(true);
                    if (userNameCookie !== loginUser.userName) {
                      toast.error("Invalid User Name", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      setTimeout(() => {
                        setLoad(false);
                        setLoginUser({ userName: "", password: "" });
                      }, 2000);
                    } else if (userPasswordCookie !== loginUser.password) {
                      toast.error("Invalid Password", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      setTimeout(() => {
                        setLoad(false);
                        setLoginUser({ userName: "", password: "" });
                      }, 2000);
                    } else {
                      toast.success("Logged In Successfuly", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      Cookies.set("jwt_isuser", "rushmunchaccessed", {
                        expires: 30,
                      });
                      setTimeout(() => {
                        navigate("/");
                      }, 2000);
                    }
                  }
                }}
                type="button"
              >
                Login
              </button>

              <p style={{ textAlign: "center" }}>
                Don't Have An Account ?&nbsp;
                <span
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{ color: "maroon", cursor: "pointer" }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
