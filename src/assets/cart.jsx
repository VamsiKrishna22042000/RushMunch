import "./cart.css";

import { MdDelete } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";

import { TailSpin } from "react-loader-spinner";

import Navbar from "./Navbar";

import MapB from "./googelmaps.jsx";

import {
  addCartItem,
  subCartItem,
  deleteCartItem,
} from "../slices/itemsStore.js";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [localCartData, setLocalCartData] = useState([]);

  const [showBill, setShowBill] = useState(false);

  const { cartData } = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    setLocalCartData(cartData);
    totalCount();
  }, [cartData]);

  const totalCount = () => {
    let totalPrice = 0;
    cartData.map((each) => (totalPrice = totalPrice + each.count * each.cost));
    setTotal(totalPrice);
  };

  const handleIncrement = (id) => {
    for (let each of cartData) {
      each.id === id &&
        dispatch(addCartItem({ ...each, count: each.count + 1 }));
    }
  };

  const handleDecrement = (id) => {
    for (let each of cartData) {
      each.id === id &&
        dispatch(subCartItem({ ...each, count: each.count - 1 }));
    }
  };

  /**Map*/

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [geoLoc, setGeoLoc] = useState("");

  const reverseGeoCoding = async () => {
    if (latitude !== "" && longitude !== "") {
      const apiKey = "AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apiKey}`;

      const response = await fetch(url);
      const jsonData = await response.json();
      if (response.ok === true) {
        setGeoLoc(jsonData.results[0].formatted_address);
      } else {
        toast.error(`${jsonData.error_message}`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      }
    }
  };

  /**Function to generate the coordinates(Latitude and longitude) for reversegeocoding*/
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  const onAddressChange = (data) => {
    setGeoLoc(data);
  };
  /**Map*/

  const Bill = () => {
    useEffect(() => {
      getLocation();
    }, []);

    useEffect(() => {
      reverseGeoCoding();
    }, [latitude, longitude]);

    const [placeOrder, setPlaceOrder] = useState(false);

    return (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "#22222250",
            zIndex: 2,
            backdropFilter: "blur(2px)",
          }}
        ></div>

        {placeOrder ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="bill-con"
          >
            <img className="success" src="./success.png" alt="success" />
            <h2 style={{ marginTop: "5%", color: "maroon" }}>Order Placed</h2>
            <p style={{ marginTop: "2.5%", textAlign: "center" }}>
              Thank you for ordering <br />
              Your Order is successfully Placed.
            </p>
          </div>
        ) : (
          <>
            <div className="bill-con">
              {geoLoc === "" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="bill-con-inside"
                >
                  <TailSpin height={50} width={50} color={"maroon"} />
                </div>
              ) : (
                <MapB
                  address={geoLoc}
                  initialLatitude={latitude}
                  initialLongitude={longitude}
                  onAddressChange={onAddressChange}
                />
              )}
              <div className="bill-con-inside">
                <h2>Bill Details</h2>
                <p>
                  <span>Item Total</span>
                  <span>₹&nbsp;{total}</span>
                </p>
                <p>
                  <span>Delivery Fee</span>
                  <span>₹&nbsp;{Math.ceil(total * 0.01)}</span>
                </p>
                <p>
                  <span>Cancellation Fee</span>
                  <span>₹&nbsp;{Math.ceil(total * 0.02)}</span>
                </p>
                <p>
                  <span>GST and Restaurant Charges</span>
                  <span>₹&nbsp;{Math.ceil(total * 0.03)}</span>
                </p>
                <hr />
                <p style={{ fontWeight: "bolder" }}>
                  <span>TO PAY</span>
                  <span>₹&nbsp;{Math.ceil(total + total * 0.06)}</span>
                </p>
                <hr />
                <div className="payment">
                  <p
                    style={{
                      width: "100%",
                      fontSize: ".7rem",
                      fontWeight: "bolder",
                      color: "marron",
                    }}
                  >
                    Payment
                  </p>
                  <button id="selected" type="button">
                    <img src="./Cash.png" alt="Cash on Delivery" />
                    Cash On Delivery
                  </button>
                  <button type="button">
                    <img src="./UPI.png" alt="UPI" />
                    UPI
                  </button>
                  <button type="button">
                    <img src="./Paytm.png" alt="Paytm" />
                    Paytm
                  </button>
                  <button type="button">
                    <img src="./Creditdebitcards.png" alt="Cards" />
                    Cards
                  </button>
                </div>
                <button
                  id="cross"
                  onClick={() => {
                    setShowBill(false);
                  }}
                  style={{
                    position: "absolute",
                    top: "3.5%",
                    right: "5%",
                    backgroundColor: "transparent",
                    color: "maroon",
                    border: 0,
                    padding: ".5%",
                    borderRadius: ".25rem",
                    cursor: "pointer",
                  }}
                  type="button"
                >
                  ✖
                </button>

                <button
                  id="placeorder"
                  onClick={() => {
                    setPlaceOrder(true);
                    setTimeout(() => {
                      setShowBill(false);
                      localStorage.removeItem("cartItems");
                      window.location.href = "/";
                    }, 2000);
                  }}
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    backgroundColor: "maroon",
                    color: "white",
                    border: 0,
                    padding: "1%",
                    borderRadius: ".25rem",
                    cursor: "pointer",
                  }}
                  type="button"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <>
        {showBill && <Bill />}
        {localCartData.length > 0 ? (
          <div className="cart-con2">
            <div className="cart-con">
              <h2>Your Cart Items</h2>
              <ul className="items-data-cart">
                {localCartData.map((each) => (
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
                    <button
                      className="delete-button"
                      onClick={() => {
                        dispatch(deleteCartItem(each.id));
                      }}
                      type="button"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </ul>
              <button
                onClick={() => {
                  setShowBill(true);
                }}
                className="total-price"
                type="button"
              >
                <p>
                  {localCartData.length}&nbsp;Items&nbsp;|&nbsp; ₹&nbsp;
                  {Math.ceil(total + total * 0.06)} Total
                </p>
                <p>
                  <AiFillProfile />
                  &nbsp;Click To Check Out
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-con2">
            <h1>
              N<img src="./404.gif" alt="No Cart Items" /> Cart Items
            </h1>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              type="button"
            >
              Go To HomePage
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
