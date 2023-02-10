import React, { MouseEventHandler, useState } from "react";
import { Modal } from "../index";
import { NavLink, useNavigate, Link, useMatch } from "react-router-dom";
import classNames from "classnames";
import logoDesktop from "../../assets/images/logo-desktop.png";
import logoTablet from "../../assets/images/logo-tablet.png";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { logout } from "../../store/loginSlice";
import { ROUTES } from "@src/consts/routes";
import "./header.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.login);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const match = useMatch(ROUTES.homePage);

  const linkStyles = (isActive?: boolean) => classNames("header__link", !match && "alt", isActive && "active");

  const onClickLogin: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    setOpenModal(true);
  };

  const onClickLogout: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    dispatch(logout());
    navigate(ROUTES.homePage);
  };

  return (
    <>
      <nav className="header">
        <Link to={ROUTES.homePage}>
          <picture>
            <source srcSet={logoTablet} media="(max-width: 768px)"></source>
            <img src={logoDesktop} alt="logo" />
          </picture>
        </Link>
        <ul className="header__list">
          <li className="header__item">
            <NavLink className={({ isActive }) => linkStyles(isActive)} to={ROUTES.homePage} end>
              Главная
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink className={({ isActive }) => linkStyles(isActive)} to={ROUTES.catalogPage}>
              Каталог продукции
            </NavLink>
          </li>
          {!token && (
            <li className="header__item">
              <NavLink className={({ isActive }) => linkStyles(isActive)} to={ROUTES.formPage}>
                Подбор программы
              </NavLink>
            </li>
          )}
          {token && (
            <li className="header__item">
              <NavLink className={({ isActive }) => linkStyles(isActive)} to={ROUTES.cardPage}>
                Корзина
              </NavLink>
            </li>
          )}
          {token && (
            <li className="header__item">
              <NavLink className={({ isActive }) => linkStyles(isActive)} to={ROUTES.ordersPage}>
                Заказы
              </NavLink>
            </li>
          )}
          {!token && (
            <li className="header__item">
              <a className={linkStyles()} href="/" onClick={onClickLogin}>
                Вход
              </a>
            </li>
          )}
          {token && (
            <li className="header__item">
              <a className={linkStyles()} href="/" onClick={onClickLogout}>
                Выйти
              </a>
            </li>
          )}
        </ul>
      </nav>
      {openModal ? <Modal setCross={setOpenModal} /> : null}
    </>
  );
};
