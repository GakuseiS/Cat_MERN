import { configureStore } from "@reduxjs/toolkit";
import { serviceApi } from "../api/service";
import errorSlice from "./errorSlice";
import loginSlice from "./loginSlice";

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    error: errorSlice,
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
