import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store.hook";
import { ROUTES } from "./routes.type";

export function PrivateOutlet() {
  const { token } = useAppSelector((state) => state.login);
  return token ? <Outlet /> : <Navigate to={ROUTES.homePage} />;
}

export function PublicOutlet() {
  const { token } = useAppSelector((state) => state.login);
  return !token ? <Outlet /> : <Navigate to={ROUTES.homePage} />;
}
