import React, { useState } from "react";
import { Button, Input } from "../../UI";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { setMessage } from "../../store/errorSlice";
import { useAppDispatch } from "../../hooks/store.hook";
import { login } from "../../store/loginSlice";
import { usePostLoginMutation, usePostRegisterMutation } from "../../api/login";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./modal.scss";

interface ModalProps {
  setCross: Function;
}

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

type LoginValues = {
  email: string;
  password: string;
};

type FieldsValues = RegisterValues | LoginValues;

const schema: yup.SchemaOf<FieldsValues> = yup
  .object({
    name: yup.string().min(3).optional(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const Modal = ({ setCross }: ModalProps) => {
  const [switcher, setSwitcher] = useState(true);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [postLogin] = usePostLoginMutation();
  const [postRegister] = usePostRegisterMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsValues>({ mode: "onBlur", resolver: yupResolver(schema) });

  const registerHandler = handleSubmit(async (data) => {
    try {
      const res = await postRegister(data as RegisterValues).unwrap();
      dispatch(setMessage(res.message));
      setSwitcher(true);
      reset();
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка регистрации");
    }
  });

  const loginHandler = handleSubmit(async (data) => {
    try {
      const res = await postLogin(data).unwrap();
      dispatch(login(res));
      setCross(false);
      history("/");
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка авторизации");
    }
  });

  return ReactDOM.createPortal(
    <div className="modal">
      <h2 className="modal__title">Личный кабинет</h2>
      <div className="modal__switches">
        <a
          className={`modal__switch ${switcher ? "active" : ""}`}
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            setSwitcher(true);
          }}
        >
          Войти
        </a>
        <a
          className={`modal__switch ${!switcher ? "active" : ""}`}
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            setSwitcher(false);
          }}
        >
          Зарегистрироваться
        </a>
      </div>
      {switcher && (
        <form className="modal__login" onSubmit={loginHandler}>
          <p className="modal__text">Введите свой логин и пароль, чтобы войти</p>
          <Input placeholder="Логин" type="email" {...register("email")} error={!!errors.email} />
          <Input placeholder="Пароль" type="password" {...register("password")} error={!!errors.password} />
          <div className="modal__wrapper">
            <Button>Войти в личный кабинет</Button>
          </div>
        </form>
      )}
      {!switcher && (
        <form className="modal__register" autoComplete="off" onSubmit={registerHandler}>
          <p className="modal__text">Введите свои данные, чтобы зарегистрироваться</p>
          <Input
            placeholder="Имя"
            type="text"
            {...register("name")}
            error={!!(errors as Partial<FieldErrorsImpl<RegisterValues>>).name}
          />
          <Input placeholder="Логин" type="email" {...register("email")} error={!!errors.email} />
          <Input placeholder="Пароль" type="password" {...register("password")} error={!!errors.password} />
          <div className="modal__wrapper">
            <Button>Зарегистрироваться</Button>
          </div>
        </form>
      )}
      <span className="modal__cross" onClick={() => setCross(false)}>
        ✕
      </span>
    </div>,
    document.body
  );
};
