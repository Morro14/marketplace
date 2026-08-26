import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BasketEntry {
  count: number;
  productId: number;
}

export interface BasketState {
  id?: number | undefined;
  entries: BasketEntry[];
}

const initialState: BasketState = {
  entries: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setProductCount(
      state,
      action: PayloadAction<{ productId: number; count: number }>,
    ) {
      const entryExists = state.entries.find(
        (entry) => entry.productId === action.payload.productId,
      );
      if (!entryExists) {
        state.entries.push({
          count: action.payload.count,
          productId: action.payload.productId,
        });
      } else {
        entryExists.count = action.payload.count;
      }
    },
  },
});

export const selectProductCount = (productId: number) => (state: RootState) => {
  const entryExists = state.basket.entries.find(
    (entry) => entry.productId === productId,
  );
  const result = entryExists ? entryExists.count : 0;
  return result;
};
export const selectBasketCount = (state: RootState) => {
  const accCount = state.basket.entries.reduce(
    (prev, cur) => {
      if (!cur?.count) return prev;
      return { count: prev.count + cur.count };
    },
    { count: 0 },
  );
  return accCount.count;
};

export const { setProductCount } = basketSlice.actions;

export default basketSlice.reducer;
