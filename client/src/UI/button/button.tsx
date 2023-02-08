import React from "react";
import classNames from "classnames";
import "./button.scss";

type ButtonProps = {
  size?: string;
  color?: string;
  page?: string;
  children?: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
};

export const Button = ({ size = "medium", color = "green", page = "", type, disabled, children }: ButtonProps) => {
  const classes = classNames({
    button: true,
    [`button-${size}`]: size,
    [`button-${color}`]: color,
    [`button-${page}`]: page,
  });
  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};
