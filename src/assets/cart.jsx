import "./cart.css";

import { MdDelete } from "react-icons/md";

import Navbar from "./Navbar";
import Footer from "./Footer";

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

  return (
    <div>
      <Navbar />
      <>
        {localCartData.length > 0 ? (
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
            <button className="total-price" type="button">
              ₹&nbsp;{total} Total
            </button>
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
      <Footer />
    </div>
  );
};

export default Cart;
