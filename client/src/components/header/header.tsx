import React, { useState } from "react";
import { Modal } from "../index";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import classNames from "classnames";
import "./header.scss";
import logoDesktop from "../../assets/images/logo-desktop.png";
import logoTablet from "../../assets/images/logo-tablet.png";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { logout } from "../../store/loginSlice";

export const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.login);
  const [openModal, setOpenModal] = useState(false);
  const history = useNavigate();
  const path = location.pathname;
  const links = classNames({
    header__link: path !== "/card" && path !== "/form" && path !== "/catalog" && path !== "/orders",
    "header__link--alt": path === "/card" || path === "/form" || path === "/catalog" || path === "/orders",
  });
  const active = classNames({
    "header__item--active": path !== "/card" && path !== "/form" && path !== "/catalog" && path !== "/orders",
    "header__item--active--alt": path === "/card" || path === "/form" || path === "/catalog" || path === "/orders",
  });

  return (
    <>
      <nav className="header">
        <Link to="/">
          <picture>
            <source srcSet={logoTablet} media="(max-width: 768px)"></source>
            <img src={logoDesktop} alt="logo" />
          </picture>
        </Link>
        <ul className="header__list">
          <li className="header__item">
            <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/" end>
              Главная
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/catalog">
              Каталог продукции
            </NavLink>
          </li>
          {!token && (
            <li className="header__item">
              <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/form">
                Подбор программы
              </NavLink>
            </li>
          )}
          {!token && (
            <li className="header__item">
              <a
                className={links}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  setOpenModal(!openModal);
                }}
              >
                Вход
              </a>
            </li>
          )}
          {token && (
            <li className="header__item">
              <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/card">
                Корзина
              </NavLink>
            </li>
          )}
          {token && (
            <li className="header__item">
              <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/orders">
                Заказы
              </NavLink>
            </li>
          )}
          {token && (
            <li className="header__item">
              <a
                className={links}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logout());
                  // logout();
                  history("/");
                }}
              >
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
