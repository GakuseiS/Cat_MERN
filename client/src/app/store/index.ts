import { configureStore } from "@reduxjs/toolkit";
import { serviceApi } from "../../shared/api/service";
import toastSlice from "../../entities/toast/model/toastSlice";
import loginSlice from "./loginSlice";

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    toast: toastSlice,
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;