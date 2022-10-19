import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";
import loginSlice from "./loginSlice";

export const store = configureStore({
  reducer: {
    error: errorSlice,
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
