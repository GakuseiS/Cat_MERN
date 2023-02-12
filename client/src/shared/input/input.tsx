import React, { ChangeEventHandler, FocusEventHandler, useState } from "react";
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [value, setValue] = useState("");
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    let value = evt.target.value;
    if (props.type === "number") {
      value = value.replace(/\D/g, "");
    }
    setValue(value);
    props.onChange?.({ ...evt, target: Object.assign(evt.target, { value }) });
  };

  return (
    <input
      ref={ref}
      onChange={onInputChange}
      value={value}
      onBlur={props.onBlur}
      id={props.id}
      className={classNames("input", props.className, props.error && "error")}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type === "number" ? "text" : props.type}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
    />
  );
});
