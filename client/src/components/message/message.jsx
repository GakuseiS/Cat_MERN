import React from "react";
import "./message.scss";

export const Message = (props) => {
  return <div className="message">{props.children}</div>;
};
