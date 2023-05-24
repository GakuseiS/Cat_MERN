import React from "react";
import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { HomePage, CatalogPage, FormPage, CartPage, OrdersPage } from "../../pages";
import { Layout } from "../../processes/layout/layout";
import { PublicOutlet, PrivateOutlet } from "./authRouter";
import { ROUTES } from "@src/app/router/routes.type";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.homePage} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.catalogPage} element={<CatalogPage />} />
      <Route element={<PublicOutlet />}>
        <Route path={ROUTES.formPage} element={<FormPage />} />
      </Route>
      <Route element={<PrivateOutlet />}>
        <Route path={ROUTES.cartPage} element={<CartPage />} />
        <Route path={ROUTES.ordersPage} element={<OrdersPage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.homePage} replace />} />
    </Route>
  )
);

export const BaseRoutes = () => {
  return <RouterProvider router={router} />;
};
