import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { BasketEntryWithProduct } from "../data/basketTypes";
import { Product } from "../data/productTypes";

type ProductId = number;
const initialState: BasketEntryWithProduct[] = [];

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setProductCount(
      state,
      action: PayloadAction<{
        count: number;
        product: Product;
      }>,
    ) {
      const entry = state.find(
        (entry) => entry.productId === action.payload.product.id,
      );
      // console.log("entry", entry, entry?.count);
      if (!entry) {
        // console.log("no entry");
        state = [
          ...state,
          {
            productId: action.payload.product.id,
            count: action.payload.count,
            product: action.payload.product,
          },
        ];
        return state;
      }

      entry.count = action.payload.count;
    },
    setBasket(state, action: PayloadAction<BasketEntryWithProduct[]>) {
      return action.payload;
    },
    deleteBasketEntry(state, action: PayloadAction<ProductId>) {
      const entryIndex = state.findIndex(
        (entry) => entry.productId === action.payload,
      );
      if (!entryIndex) return;
      state = state.splice(entryIndex);
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
export const selectTotalCost = (state: RootState) => {
  const costs = state.basket.map((entry) => entry.count * entry.product.price);
  const result = costs.reduce((prev, cur) => {
    let prev_ = prev || 0;
    let cur_ = cur || 0;
    return prev_ + cur_;
  }, 0);
  return result;
};

export const selectProduct = (productId: number) => (state: RootState) => {
  const product = state.basket.find((p) => p.productId === productId)?.product;
  return product;
};

export const { setProductCount, setBasket, deleteBasketEntry } =
  basketSlice.actions;

export default basketSlice.reducer;
