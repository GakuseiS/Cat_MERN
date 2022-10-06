import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "../index";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import classNames from "classnames";
import "./header.scss";
import logoDesktop from "../../assets/images/logo-desktop.png";
import logoTablet from "../../assets/images/logo-tablet.png";
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
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
          {!isAuthenticated && (
            <li className="header__item">
              <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/form">
                Подбор программы
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li className="header__item">
              <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/card">
                Корзина
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li className="header__item">
              <NavLink className={({ isActive }) => (isActive ? `${links} ${active}` : links)} to="/orders">
                Заказы
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
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
          {isAuthenticated && (
            <li className="header__item">
              <a
                className={links}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  logout();
                  history("/");
                }}
              >
                Выйти
              </a>
            </li>
          )}
        </ul>
      </nav>
      {openModal ? ReactDOM.createPortal(<Modal setCross={setOpenModal} />, document.body) : null}
    </>
  );
};
