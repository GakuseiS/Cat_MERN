import React from "react";
import { Header, Footer, Message } from "../index";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import ErrorContext from "../../context/ErrorContext";
import styles from "./layout.module.scss";

export const Layout = () => {
  const { error } = useContext(ErrorContext);
  return (
    <div className={styles.container}>
      {error ? <Message>{error}</Message> : null}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
