import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { MainPage, CatalogPage, FormPage, CardPage, OrdersPage } from "../pages";
import { Layout } from "../components/Layout/Layout";
import { NoAuthOutlet, PrivateOutlet } from "./PrivateRouter";
import { ROUTES } from "@src/consts/routes";

export const BaseRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.homePage} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={ROUTES.catalogPage} element={<CatalogPage />} />
          <Route element={<NoAuthOutlet />}>
            <Route path={ROUTES.formPage} element={<FormPage />} />
          </Route>
          <Route element={<PrivateOutlet />}>
            <Route path={ROUTES.cardPage} element={<CardPage />} />
            <Route path={ROUTES.ordersPage} element={<OrdersPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.homePage} replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
