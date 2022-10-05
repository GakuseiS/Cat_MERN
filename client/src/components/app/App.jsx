import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header.jsx";
import { MainPage, CatalogPage, FormPage, CardPage, OrdersPage } from "../../pages";
import "./App.scss";
import { AuthContext } from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import { useAuth } from "../../hooks/auth.hook";
import Loader from "../loader/loader";
import Message from "../message/message";
import { useError } from "../../hooks/error.hook";

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const { error, errorMessage } = useError();

  if (!ready) {
    return <Loader />;
  }

  return (
    <div className="app">
      <ErrorContext.Provider value={{ error, errorMessage }}>
        <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
          <Router>
            {error && <Message>{error}</Message>}
            <Header />
            <Routes>
              <Route path="catalog" element={<CatalogPage />} />
              {!isAuthenticated && <Route path="form" element={<FormPage />} />}
              {isAuthenticated && <Route path="card" element={<CardPage />} />}
              {isAuthenticated && <Route path="orders" element={<OrdersPage />} />}
              <Route path="/" element={<MainPage />} />
              <Route path="*" to="/" />
            </Routes>
            <Footer />
          </Router>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
