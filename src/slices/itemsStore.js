import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};

const itemsReducer = createSlice({
  name: "itemsCount",
  initialState: initialState,
  reducers: {
    addCartItem: (state, action) => {
      if (state.cartData.length === 0) {
        state.cartData = [...state.cartData, action.payload];
      } else {
        let updatedData = [];
        let related = false;
        state.cartData.map((each) => {
          if (each.id === action.payload.id) {
            updatedData.push(action.payload);
            related = true;
          } else {
            updatedData.push(each);
          }
        });
        !related
          ? (state.cartData = [...state.cartData, action.payload])
          : (state.cartData = updatedData);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartData));
    },
    subCartItem: (state, action) => {
      if (action.payload.count === 0) {
        state.cartData = state.cartData.filter(
          (each) => each.id !== action.payload.id
        );
      } else {
        let updatedData = [];

        state.cartData.map((each) => {
          if (each.id === action.payload.id) {
            updatedData.push(action.payload);
          } else {
            updatedData.push(each);
          }
        });
        state.cartData = updatedData;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartData));
    },
    setInitialData: (state, action) => {
      state.cartData = action.payload;
    },
    deleteCartItem: (state, action) => {
      state.cartData = state.cartData = state.cartData.filter(
        (each) => each.id !== action.payload
      );
    },
  },
});

export const { addCartItem, subCartItem, setInitialData, deleteCartItem } =
  itemsReducer.actions;

export default itemsReducer.reducer;
