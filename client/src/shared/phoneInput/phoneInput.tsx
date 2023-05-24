import classNames from "classnames";
import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";
import InputMask, { ReactInputMask } from "react-input-mask";
import "./phoneInput.scss";

interface PhoneInputProps {
  id?: string;
  name?: string;
  className?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: boolean;
}

export const PhoneInput = forwardRef<ReactInputMask, PhoneInputProps>((props, ref) => {
  return (
    <InputMask
      ref={ref}
      onChange={props.onChange}
      onBlur={props.onBlur}
      mask="+7 (999) 999-99-99"
      className={classNames("input", props.className, props.error && "error")}
      id={props.id}
      placeholder="+7 (800) 900-60-90"
      name={props.name}
      required={props.required}
    />
  );
});
