import React, { useContext } from "react";
import ErrorContext from "../../context/ErrorContext";
import "./message.scss";

export const Message = () => {
  const { error } = useContext(ErrorContext);

  return <>{error ? <div className="message">{error}</div> : null}</>;
};
