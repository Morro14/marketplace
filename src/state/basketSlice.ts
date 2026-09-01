import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { BasketEntryWithProduct } from "../data/basketTypes";
import type { Product } from "../data/productTypes";

const initialState: BasketEntryWithProduct[] = [];

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setProductCount(
      state,
      action: PayloadAction<{
        productId: number;
        count: number;
        product: Product;
      }>,
    ) {
      const entryExists = state.find(
        (entry) => entry.productId === action.payload.productId,
      );
      if (!entryExists) {
        state.push({
          productId: action.payload.productId,
          count: action.payload.count,
          product: action.payload.product,
        });
      } else {
        entryExists.count = action.payload.count;
        entryExists.product = action.payload.product;
      }
    },
    setBasket(state, action: PayloadAction<BasketEntryWithProduct[]>) {
      if (action.payload.length === 0) return;
      return action.payload;
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
export const selectProduct = (productId: number) => (state: RootState) => {
  const product = state.basket.find((p) => p.productId === productId)?.product;
  return product;
};

export const { setProductCount, setBasket } = basketSlice.actions;

export default basketSlice.reducer;
