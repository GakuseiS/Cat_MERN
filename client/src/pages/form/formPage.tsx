import React from "react";
import { Form } from "../../components";
import "./formPage.scss";

export const FormPage = () => {
  return (
    <div className="formPage">
      <h1 className="formPage__title">Подбор программы</h1>
      <Form />
    </div>
  );
};
