import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../index";
import "./appeal.scss";
import can from "../../assets/images/index-can.png";
import { useAppSelector } from "../../hooks/store.hook";

export const Appeal = () => {
  const { token } = useAppSelector((state) => state.login);
  return (
    <div className="appeal">
      <div className="appeal__left">
        <h1 className="appeal__header">Функциональное питание для котов</h1>
        <p className="appeal__text">Занялся собой? Займись котом!</p>
        {!token ? (
          <Link to="/form">
            <Button>Подобрать программу</Button>
          </Link>
        ) : null}
      </div>
      <img className="appeal__img" src={can} alt="can" />
    </div>
  );
};
