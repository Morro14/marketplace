import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type ProductId = number;
const initialState: number[] = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<number[]>) {
      return action.payload;
    },
    addFavorite(state, action: PayloadAction<number>) {
      const exists = state.find((entry) => entry === action.payload);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<ProductId>) {
      const index = state.findIndex((entry) => entry === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const selectFavorites = (state: RootState) => {
  return state.favorites;
};

export const selectIsFavorited = (productId: number) => (state: RootState) => {
  return state.favorites.some((entry) => entry === productId);
};

export const selectFavoritesCount = (state: RootState) => {
  return state.favorites.length;
};

export const { setFavorites, addFavorite, removeFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
