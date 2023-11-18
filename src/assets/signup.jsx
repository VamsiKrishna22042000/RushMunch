import "./login.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({ userName: "", password: "" });

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
                  setSignUp({ ...signUp, userName: e.target.value });
                }}
              />
              <p>PASSWORD</p>
              <input
                type="password"
                onChange={(e) => {
                  setSignUp({ ...signUp, password: e.target.value });
                }}
              />
              <button
                onClick={() => {
                  if (signUp.userName === "") {
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
                  } else if (signUp.password === "") {
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
                    Cookies.remove("jwt_username");
                    Cookies.remove("jwt_password");
                    Cookies.set("jwt_username", signUp.userName, {
                      expires: 30,
                    });
                    Cookies.set("jwt_password", signUp.password, {
                      expires: 30,
                    });
                    toast.success("Signed Up Successfully", {
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
                      setSignUp({ userName: "", password: "" });
                      localStorage.removeItem("cartItems");
                      navigate("/login");
                    }, 2000);
                  }
                }}
                type="button"
              >
                Sign Up
              </button>

              <p style={{ textAlign: "center" }}>
                Already Have An Account ? &nbsp;
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{ color: "maroon", cursor: "pointer" }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
