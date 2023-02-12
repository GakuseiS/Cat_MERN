import React from "react";
import ReactDOM from "react-dom";
import styles from "./alert.module.css";

interface AlertProps {
  message?: string;
}

export const Alert = (props: AlertProps) => {
  const { message } = props;

  if (message) return ReactDOM.createPortal(<div className={styles.toast}>{message}</div>, document.body);
  return null;
};
