import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { BasketEntry } from "../data/basketTypes";

const initialState: Partial<BasketEntry>[] = [];

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setProductCount(state, action: PayloadAction<Partial<BasketEntry>>) {
      const entryExists = state.find(
        (entry) => entry.productId === action.payload.productId,
      );
      if (!entryExists) {
        state.push({
          count: action.payload.count,
          productId: action.payload.productId,
        });
      } else {
        entryExists.count = action.payload.count;
      }
    },
    setBasket(state, action: PayloadAction<BasketEntry[]>) {
      if (action.payload.length === 0) return;
      const entriesMapped = action.payload.map((entry) => {
        return { productId: entry.productId, count: entry.count };
      });
      return entriesMapped;
    },
  },
});
export const selectBasket = (state: RootState) => {
  return state.basket;
};
export const selectProductCount = (productId: number) => (state: RootState) => {
  const entryExists = state.basket.find(
    (entry) => entry.productId === productId,
  );
  const result = entryExists?.count ? entryExists.count : 0;
  return result;
};
export const selectBasketCount = (state: RootState) => {
  const accCount = state.basket.reduce(
    (prev, cur) => {
      if (!cur?.count) return prev;
      const prevDef = prev.count || 0;
      return { count: prevDef + cur.count };
    },
    { count: 0 },
  );
  return accCount.count;
};

export const { setProductCount, setBasket } = basketSlice.actions;

export default basketSlice.reducer;
