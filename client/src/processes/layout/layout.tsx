import React from "react";
import { Outlet } from "react-router-dom";
import { Toast } from "@src/entities/toast";
import { Header } from "@src/widgets/header";
import { Footer } from "@src/widgets/footer";
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
