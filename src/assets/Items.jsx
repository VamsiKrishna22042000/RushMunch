import "./home.css";

import "./footer.css";

import "./items.css";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar.jsx";

import Footer from "./Footer.jsx";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  addCartItem,
  subCartItem,
  setInitialData,
} from "../slices/itemsStore.js";

const Items = () => {
  const { restrauntId } = useParams();

  const dispatch = useDispatch();

  const [hotelData, setHotelData] = useState(() => {
    return [];
  });

  const [foodItems, setFoodItems] = useState(() => {
    return [];
  });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/restaurants-list/${restrauntId}`;

      const reqConfigure = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y",
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(url, reqConfigure);

      if (response.status === 200) {
        setHotelData(response.data);

        {
          /**console.log(response.data)*/
        }

        let Items = [];

        for (let each of response.data.food_items) {
          Items.push({ ...each, count: 0 });
        }

        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        if (cartItems === null) {
          setFoodItems(Items);
          dispatch(setInitialData([]));
        } else {
          let updatedItems = [];
          for (let eachOne of Items) {
            let related = false;
            for (let eachItem of cartItems) {
              if (eachOne.id === eachItem.id) {
                updatedItems.push(eachItem);
                related = true;
              }
            }
            !related && updatedItems.push(eachOne);
          }

          /*console.log(updatedItems);*/
          setFoodItems(updatedItems);
          dispatch(setInitialData(cartItems));
        }
      }
    } catch (error) {
      toast.info(`${error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleIncrement = (id) => {
    let items = [];
    for (let each of foodItems) {
      each.id === id
        ? (items.push({ ...each, count: each.count + 1 }),
          dispatch(addCartItem({ ...each, count: each.count + 1 })))
        : items.push(each);
    }
    setFoodItems(items);
  };

  const handleDecrement = (id) => {
    let items = [];
    for (let each of foodItems) {
      each.id === id
        ? (items.push({ ...each, count: each.count - 1 }),
          dispatch(subCartItem({ ...each, count: each.count - 1 })))
        : items.push(each);
    }
    setFoodItems(items);
  };

  return hotelData.length === 0 ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width="10%" src="/food loader.gif" alt="foodloader" />
    </div>
  ) : (
    <div>
      <ToastContainer />
      <Navbar />
      <div>
        <div
          style={{ backgroundImage: `url(/hotel-header.png)` }}
          className="hotel-header"
        >
          <div className="hotel-data">
            <img src={hotelData.image_url} alt="Hotel-data" />
            <div className="hotel-content">
              <h2>{hotelData.name}</h2>
              <p>{hotelData.cuisine}</p>
              <p>{hotelData.location}</p>
              <div className="rate-box">
                <div className="ratings">
                  <div>
                    <img src="/ratingstar.png" alt="rating" />
                    <p>{hotelData.rating}</p>
                  </div>
                  <p>{hotelData.reviews_count} Ratings</p>
                </div>
                <div className="costs">
                  <p>₹ {hotelData.cost_for_two}</p>
                  <p>Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="items-data">
          {foodItems.map((each) => (
            <div key={each.id} className="food-items">
              <img src={each.image_url} alt={each.id} />
              <div className="item-details">
                <h5>{each.name}</h5>
                <p>₹&nbsp;{each.cost}</p>
                <div>
                  <img src="/ratingstar.png" alt="rating" />
                  <p>{each.rating}</p>
                </div>
                {each.count === 0 ? (
                  <button
                    onClick={() => {
                      handleIncrement(each.id);
                    }}
                    id={each.id}
                    className="button-Add"
                    type="button"
                  >
                    Add
                  </button>
                ) : (
                  <div className="inc-dec-con">
                    <button
                      onClick={() => {
                        handleDecrement(each.id);
                      }}
                      id={each.id}
                      className="button-inc"
                      type="button"
                    >
                      -
                    </button>
                    {each.count}
                    <button
                      onClick={() => {
                        handleIncrement(each.id);
                      }}
                      id={each.id}
                      className="button-inc"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Items;
