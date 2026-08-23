import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
export interface BasketState {
  counts: Record<number, number>;
}

const initialState: BasketState = {
  counts: {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setProductCount(
      state,
      action: PayloadAction<{ productId: number; count: number }>,
    ) {
      state.counts[action.payload.productId] = action.payload.count;
    },
  },
});

export const selectProductBasketCount = (productId: number) => (state: RootState) =>
  state.basket.counts[productId] ?? 0;

export const { setProductCount } = basketSlice.actions;

export default basketSlice.reducer;
