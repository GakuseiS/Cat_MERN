import React, { ChangeEventHandler, useState } from "react";
import "./input.scss";
import classNames from "classnames";

type InputProps = {
  name?: string;
  placeholder?: string;
  type?: "password" | "email" | "text" | "number";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  id?: string;
  className?: string;
};

export const Input = (props: InputProps) => {
  const [value, setValue] = useState("");

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target.value;
    if (props.type === "number") {
      value = value.replace(/\D/g, "");
    }
    setValue(value);
  };

  return (
    <input
      id={props.id}
      className={classNames("input", props.className)}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type === "number" ? "text" : props.type}
      value={value}
      onChange={onInputChange}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
    />
  );
};
