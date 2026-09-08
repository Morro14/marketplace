import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import basketReducer from "./basketSlice";
import checkoutReducer from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
