import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const errorSlice = createSlice({
  initialState,
  name: "error",
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = errorSlice.actions;
export default errorSlice.reducer;
