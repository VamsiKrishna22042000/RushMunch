import "./home.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "./Slider";
import Hotels from "./Hotels.jsx";
import Footer from "./Footer.jsx";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  const [shownav, setShowNav] = useState(false);
  const [animation, setAniamtion] = useState("");
  const [load, setLoad] = useState(false);

  const [priceSort, setPriceSort] = useState("Lowest");

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1500);
  }, []);

  return load ? (
    <div className="home-page-con">
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
          <li>Cart</li>
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
          <li>Cart</li>
          <li>
            <button type="button">LogIn</button>
          </li>
        </ul>
      </div>
      <ul className="slider-main-con">
        <SimpleSlider />
      </ul>
      <div className="popular-res">
        <h4>Popular Restaurants</h4>
        <div>
          <p>
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div>
            <p>Sort By : </p>
            <select onChange={(e) => setPriceSort(e.target.value)}>
              <option>Lowest</option>
              <option>Highest</option>
            </select>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "1%", marginLeft: "2%", marginRight: "2%" }} />
      <Hotels priceSort={priceSort} />
      <Footer />
    </div>
  ) : (
    <div className="loader-con">
      <h1>Rush Munch</h1>
    </div>
  );
};

export default HomePage;
