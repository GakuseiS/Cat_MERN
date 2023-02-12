import React from "react";
import { Provider } from "react-redux";
import { BaseRoutes } from "./router";
import { store } from "./store";
import { initLogin } from "./store/loginSlice";
import "./index.css";

export const App = () => {
  store.dispatch(initLogin());
  return (
    <Provider store={store}>
      <BaseRoutes />
    </Provider>
  );
};
