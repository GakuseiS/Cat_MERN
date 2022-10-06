import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../index";
import "./appeal.scss";
import can from "../../assets/images/index-can.png";

export const Appeal = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="appeal">
      <div className="appeal__left">
        <h1 className="appeal__header">Функциональное питание для котов</h1>
        <p className="appeal__text">Занялся собой? Займись котом!</p>
        {!isAuthenticated ? (
          <Link to="/form">
            <Button>Подобрать программу</Button>
          </Link>
        ) : null}
      </div>
      <img className="appeal__img" src={can} alt="can" />
    </div>
  );
};
