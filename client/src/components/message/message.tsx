import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setMessage } from "../../store/errorSlice";
import "./message.scss";

export const Message = () => {
  const error = useAppSelector((state) => state.error.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(setMessage("")), 3000);
    }
  }, [error]);

  return <>{error ? ReactDOM.createPortal(<div className="message">{error}</div>, document.body) : null}</>;
};
