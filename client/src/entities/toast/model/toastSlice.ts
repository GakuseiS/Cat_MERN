import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const toastSlice = createSlice({
  initialState,
  name: "toast",
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = toastSlice.actions;
export default toastSlice.reducer;
