import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    onlineNetwork: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});
export const { onlineNetwork } = networkSlice.actions;
export const selectNetwork = ({ network }) => network;
export default networkSlice.reducer;
