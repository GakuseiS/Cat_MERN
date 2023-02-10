import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "@src/hooks/store.hook";
import { setMessage } from "@src/store/toastSlice";
import styles from "./toast.module.css";

export const Toast = () => {
  const message = useAppSelector((state) => state.toast.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage("")), 3000);
    }
  }, [message]);

  if (message) return ReactDOM.createPortal(<div className={styles.toast}>{message}</div>, document.body);
  return null;
};
