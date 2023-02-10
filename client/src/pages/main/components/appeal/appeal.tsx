import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@src/ui";
import can from "@src/assets/images/index-can.png";
import { useAppSelector } from "@src/hooks/store.hook";
import "./appeal.scss";

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
