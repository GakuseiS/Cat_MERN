import React, { FormEventHandler, useState } from "react";
import { Button, Input } from "../index";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./modal.scss";
import { setMessage } from "../../store/errorSlice";
import { useAppDispatch } from "../../hooks/store.hook";
import { login } from "../../store/loginSlice";
import { usePostLoginMutation, usePostRegisterMutation } from "../../services/login";

interface ModalProps {
  setCross: Function;
}

type ModalFields = {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
};

export const Modal = ({ setCross }: ModalProps) => {
  const [switcher, setSwitcher] = useState(true);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [postLogin] = usePostLoginMutation();
  const [postRegister] = usePostRegisterMutation();

  const registerHandler: FormEventHandler<HTMLFormElement & ModalFields> = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = evt.currentTarget;
    try {
      const data = await postRegister({ name: name.value, email: email.value, password: password.value }).unwrap();
      dispatch(setMessage(data.message));
      setSwitcher(true);
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка регистрации");
    }
  };

  const loginHandler: FormEventHandler<HTMLFormElement & Omit<ModalFields, "name">> = async (evt) => {
    evt.preventDefault();
    const { email, password } = evt.currentTarget;
    try {
      const data = await postLogin({ email: email.value, password: password.value }).unwrap();
      dispatch(login(data));
      setCross(false);
      history("/");
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка авторизации");
    }
  };

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
          <Input name="email" placeholder="Логин" type="email" minLength={3} required />
          <Input name="password" placeholder="Пароль" type="password" minLength={6} required />
          <div className="modal__wrapper">
            <Button>Войти в личный кабинет</Button>
          </div>
        </form>
      )}
      {!switcher && (
        <form className="modal__register" autoComplete="off" onSubmit={registerHandler}>
          <p className="modal__text">Введите свои данные, чтобы зарегистрироваться</p>
          <Input name="name" placeholder="Имя" type="text" minLength={3} required />
          <Input name="email" placeholder="Логин" type="email" minLength={3} required />
          <Input name="password" placeholder="Пароль" type="password" minLength={6} required />
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
