import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { Product } from "../data/productTypes";

type BasketPayload = [{ product: Product; count: number }];

export interface BasketState {
  entries: BasketPayload[];
}

const initialState: BasketState = {
  entries: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<BasketPayload>) {
      state.entries.push(action.payload);
    },
  },
});

export const selectBasketContent = (state: RootState) => state.basket.entries;

export const { addProduct } = basketSlice.actions;

export default basketSlice.reducer;
