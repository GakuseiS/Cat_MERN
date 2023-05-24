import React, { useRef } from "react";
import { NavLink, useNavigate, Link, useMatch } from "react-router-dom";
import cn from "classnames";
import logoDesktop from "@src/assets/images/logo-desktop.png";
import logoTablet from "@src/assets/images/logo-tablet.png";
import { useAppDispatch, useAppSelector } from "../../../app/store/store.hook";
import { logout } from "../../../app/store/loginSlice";
import { ROUTES } from "@src/app/router/routes.type";
import { useDetectClick } from "@src/app/hooks/useDetectClick";
import { AuthModal } from "@src/widgets/authModal";
import "./header.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const match = useMatch(ROUTES.homePage);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive, setActive } = useDetectClick({ ref: modalRef });

  const linkStyles = (isActive?: boolean) => cn("header__link", !match && "alt", isActive && "active");

  const onClickLogin = () => {
    setActive(true);
  };

  const onClickLogout = () => {
    dispatch(logout());
    navigate(ROUTES.homePage);
  };

  return (
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
            <NavLink className={({ isActive }) => linkStyles(isActive)} to={ROUTES.cartPage}>
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
            <button className={linkStyles()} onClick={onClickLogin}>
              Вход
            </button>
          </li>
        )}
        {token && (
          <li className="header__item">
            <button className={linkStyles()} onClick={onClickLogout}>
              Выйти
            </button>
          </li>
        )}
      </ul>
      {isActive ? <AuthModal ref={modalRef} onClose={setActive} /> : null}
    </nav>
  );
};
