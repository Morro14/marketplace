import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import { Product } from "../data/productTypes";

type ProductId = number;
export type BasketEntry = {
  productId: number;
  count: number;
  product?: Product | undefined;
};
type BasketState = BasketEntry[] | null;
const initialState: BasketState = null;

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState as BasketState,
  reducers: {
    setProductCount(
      state,
      action: PayloadAction<{
        productId: number;
        count: number;
      }>,
    ) {
      if (state === null) return
      const entry = state.find(
        (entry) => entry.productId === action.payload.productId,
      );
      if (!entry) {
        state.push(
          {
            productId: action.payload.productId,
            count: action.payload.count,
          })
        return
      }

      entry.count = action.payload.count;
    },
    setBasket(state, action: PayloadAction<BasketEntry[]>) {
      return action.payload;
    },
    deleteBasketEntry(state, action: PayloadAction<ProductId>) {
      if (state === null) return
      const entryIndex = state.findIndex(
        (entry) => entry.productId === action.payload,
      );
      if (!entryIndex) return;
      const newState = state.toSpliced(entryIndex, 1);
      return newState;
    },
  },
});
export const selectBasket = (state: RootState) => {
  return state.basket;
};
export const selectProductCount = (productId: number) => (state: RootState) => {
  if (state.basket === null) return
  const entryExists = state.basket.find(
    (entry) => entry.productId === productId,
  );
  const result = entryExists?.count ? entryExists.count : 0;
  return result;
};
export const selectBasketCount = (state: RootState) => {
  if (state.basket === null) return
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
  if (state.basket === null) return
  const costs = state.basket.map((entry) => {
    if (entry.product) {
      return entry.count * entry.product.price;
    }
    return 0;
  });
  const result = costs.reduce((prev, cur) => {
    let prev_ = prev || 0;
    let cur_ = cur || 0;
    return prev_ + cur_;
  }, 0);
  return result;
};

export const selectProduct = (productId: number) => (state: RootState) => {
  if (state.basket === null) return
  const product = state.basket.find((p) => p.productId === productId)?.product;
  return product;
};

export const { setProductCount, setBasket, deleteBasketEntry } =
  basketSlice.actions;

export default basketSlice.reducer;
