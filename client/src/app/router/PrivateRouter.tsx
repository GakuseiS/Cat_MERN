import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAppSelector } from "../lib/store.hook";
import { ROUTES } from "../lib/routes";

export function PrivateOutlet() {
  const { token } = useAppSelector((state) => state.login);
  return token ? <Outlet /> : <Navigate to={ROUTES.homePage} />;
}

export function NoAuthOutlet() {
  const { token } = useAppSelector((state) => state.login);
  return !token ? <Outlet /> : <Navigate to={ROUTES.homePage} />;
}
