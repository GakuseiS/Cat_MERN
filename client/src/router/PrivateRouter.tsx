import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAppSelector } from "../hooks/store.hook";

export function PrivateOutlet() {
  const { token } = useAppSelector((state) => state.login);
  return token ? <Outlet /> : <Navigate to="/" />;
}

export function NoAuthOutlet() {
  const { token } = useAppSelector((state) => state.login);
  return !token ? <Outlet /> : <Navigate to="/" />;
}
