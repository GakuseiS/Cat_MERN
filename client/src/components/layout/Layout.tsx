import React from "react";
import { Header, Footer, Toast } from "../index";
import { Outlet } from "react-router-dom";

import styles from "./layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Toast />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
