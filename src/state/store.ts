import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import basketReducer from "./basketSlice";
import checkoutReducer from "./checkoutSlice";
import favoritesReducer from "./favoritesSlice";
import generalReducer from "./generalSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    checkout: checkoutReducer,
    favorites: favoritesReducer,
    general: generalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
