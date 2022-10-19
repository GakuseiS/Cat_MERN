import React from "react";
import classNames from "classnames";
import "./button.scss";

export const Button = ({
  size = "medium",
  color = "green",
  page = "",
  type,
  children,
}: {
  size?: string;
  color?: string;
  page?: string;
  children?: React.ReactNode;
  type?: "submit" | "button";
}) => {
  const classes = classNames({
    button: true,
    [`button-${size}`]: size,
    [`button-${color}`]: color,
    [`button-${page}`]: page,
  });
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};
