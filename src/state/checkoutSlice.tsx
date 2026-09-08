import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Currency } from "../utils/appVars";
interface CheckoutState {
  currency: Currency;
}

const initialState: CheckoutState = { currency: "USD" };

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrency(
      state,
      action: PayloadAction<{
        currency: Currency;
      }>,
    ) {
      state.currency = action.payload.currency;
    },
  },
});

export const selectCurrency = (state: RootState) => {
  return state.checkout.currency;
};

export const { setCurrency } = checkoutSlice.actions;

export default checkoutSlice.reducer;
