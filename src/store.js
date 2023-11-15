import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "./slices/itemsStore.js";

export const store = configureStore({
  reducer: {
    cartItems: itemReducer,
  },
});
