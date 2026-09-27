import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { fetching: false };

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setFetching(state, action: PayloadAction<boolean>) {
      state.fetching = action.payload
    }
  }
});


export const { setFetching } =
  generalSlice.actions;

export default generalSlice.reducer;
