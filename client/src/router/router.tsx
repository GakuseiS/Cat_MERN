import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { MainPage, CatalogPage, FormPage, CardPage, OrdersPage } from "../pages";
import { Layout } from "../components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store";
import { initLogin } from "../store/loginSlice";
import { NoAuthOutlet, PrivateOutlet } from "./PrivateRouter";

export const BaseRoutes = () => {
  store.dispatch(initLogin());
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route element={<NoAuthOutlet />}>
              <Route path="form" element={<FormPage />} />
            </Route>
            <Route element={<PrivateOutlet />}>
              <Route path="card" element={<CardPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
