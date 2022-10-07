import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";
import "./modal.scss";

interface ModalProps {
  setCross: Function;
}

export const Modal = ({ setCross }: ModalProps) => {
  const [switcher, setSwitcher] = useState(true);
  const { login } = useContext(AuthContext);
  const { errorMessage } = useContext(ErrorContext);
  const history = useNavigate();

  const getRegister = async (evt: any) => {
    evt.preventDefault();
    const obj: { [key: string]: string } = {};
    const data = new FormData(evt.target);
    data.forEach((item, i) => {
      obj[i] = item as string;
    });
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (res.status === 200) {
        errorMessage((await res.json()).message);
      }
    } catch (err) {
      console.error("Ошибка регистрации");
    }
  };

  const getLogin = async (evt: any) => {
    evt.preventDefault();
    const obj: { [key: string]: string } = {};
    const data = new FormData(evt.target);
    data.forEach((item, i) => {
      obj[i] = item as string;
    });
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      if (res.status === 200) {
        login(data.token, data.userId);
        setCross(false);
        history("/");
      } else {
        errorMessage(data.message);
      }
    } catch (err) {
      console.error("Ошибка авторизации");
    }
  };

  return (
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
        <form className="modal__login" onSubmit={getLogin}>
          <p className="modal__text">Введите свой логин и пароль, чтобы войти</p>
          <input className="modal__input-text" name="email" placeholder="Логин" type="email" minLength={3} required />
          <input
            className="modal__input-text"
            name="password"
            placeholder="Пароль"
            type="password"
            minLength={6}
            required
          />
          <div className="modal__wrapper">
            <Button>Войти в личный кабинет</Button>
          </div>
        </form>
      )}
      {!switcher && (
        <form className="modal__register" autoComplete="off" onSubmit={getRegister}>
          <p className="modal__text">Введите свои данные, чтобы зарегистрироваться</p>
          <input className="modal__input-text" name="name" placeholder="Имя" type="text" minLength={3} required />
          <input className="modal__input-text" name="email" placeholder="Логин" type="email" required />
          <input
            className="modal__input-text"
            name="password"
            placeholder="Пароль"
            type="password"
            minLength={6}
            required
          />
          <div className="modal__wrapper">
            <Button>Зарегистрироваться</Button>
          </div>
        </form>
      )}
      <span className="modal__cross" onClick={() => setCross(false)}>
        ✕
      </span>
    </div>
  );
};
