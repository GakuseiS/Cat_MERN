import React from "react";
import { Button, Input } from "@src/UI";
import ReactDOM from "react-dom";
import { FieldErrorsImpl } from "react-hook-form";
import { useModal } from "./useModal";
import { RegisterValues } from "./modal.types";
import "./modal.scss";
import classNames from "classnames";

interface ModalProps {
  onClose: Function;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const { onClose } = props;
  const { loginHandler, registerHandler, switcher, register, errors, switchContent } = useModal(props);

  return ReactDOM.createPortal(
    <div className="modal">
      <div ref={ref} className="modal__box">
        <h2 className="modal__title">Личный кабинет</h2>
        <div className="modal__switches">
          <a className={classNames("modal__switch", switcher && "active")} href="/" onClick={switchContent}>
            Войти
          </a>
          <a className={classNames("modal__switch", !switcher && "active")} href="/" onClick={switchContent}>
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
        <span className="modal__cross" onClick={() => onClose(false)}>
          ✕
        </span>
      </div>
    </div>,
    document.body
  );
});
