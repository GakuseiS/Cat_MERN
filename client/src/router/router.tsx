import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { MainPage, CatalogPage, FormPage, CardPage, OrdersPage } from "../pages";
import { AuthContext } from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";
import { useAuth } from "../hooks/auth.hook";
import { Loader } from "../components/index";
import { useError } from "../hooks/error.hook";
import { Layout } from "../components/layout/Layout";

export const BaseRoutes = () => {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const { error, errorMessage } = useError();

  if (!ready) {
    return <Loader />;
  }

  return (
    <ErrorContext.Provider value={{ error, errorMessage }}>
      <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="catalog" element={<CatalogPage />} />
              {!isAuthenticated && <Route path="form" element={<FormPage />} />}
              {isAuthenticated && <Route path="card" element={<CardPage />} />}
              {isAuthenticated && <Route path="orders" element={<OrdersPage />} />}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ErrorContext.Provider>
  );
};
