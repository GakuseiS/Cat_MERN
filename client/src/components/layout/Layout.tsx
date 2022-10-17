import React from "react";
import { Header, Footer, Message } from "../index";
import { Outlet } from "react-router-dom";

import styles from "./layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Message />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
