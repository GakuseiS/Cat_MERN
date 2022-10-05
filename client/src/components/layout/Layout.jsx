import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import ErrorContext from "../../context/ErrorContext";
import Message from "../message/message";

export const Layout = () => {
  const { error } = useContext(ErrorContext);
  return (
    <>
      {error ? <Message>{error}</Message> : null}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
