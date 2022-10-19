import React from "react";
import InputMask from "react-input-mask";
import "./phoneInput.scss";

type PhoneInputProps = {
  id?: string;
  name?: string;
  required?: boolean;
};

export const PhoneInput = (props: PhoneInputProps) => {
  return (
    <InputMask
      mask="+7 (999) 999-99-99"
      className="phone-input"
      id={props.id}
      placeholder="+7 (800) 900-60-90"
      name={props.name}
      required={props.required}
    />
  );
};
