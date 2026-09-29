import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { navigationStatus: "idle" };
type NavigateStatus = "idle" | "submitting" | "loading";
const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNavigationStatus(state, action: PayloadAction<NavigateStatus>) {
      state.navigationStatus = action.payload;
    },
  },
});

export const { setNavigationStatus } = generalSlice.actions;

export default generalSlice.reducer;
