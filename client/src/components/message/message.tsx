import React from "react";
import "./message.scss";

export const Message = (props: { children: React.ReactNode }) => {
  return <div className="message">{props.children}</div>;
};
