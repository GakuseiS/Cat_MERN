import React from "react";
import { Link } from "react-router-dom";
import "./features.scss";

export const Features = () => {
  return (
    <div className="features">
      <div className="features__item">
        <div className="features__wrapper">
          <h2 className="features__title">
            <span className="features__title-icon features__title-icon--slim"></span>Похудение
          </h2>
          <p className="features__text">
            Ваш кот весит больше собаки и почти утратил способность лазить по деревьям? Пора на диету! Cat Energy Slim
            поможет вашему питомцу сбросить лишний вес.
          </p>
          <Link className="features__link" to="/catalog">
            Каталог SLIM <span className="features__link-icon"></span>
          </Link>
        </div>
        <span className="features__title-icon features__title-icon--slim features__title-icon--table"></span>
      </div>

      <div className="features__item">
        <div className="features__wrapper">
          <h2 className="features__title">
            <span className="features__title-icon features__title-icon--pro"></span>Набор массы
          </h2>
          <p className="features__text">
            Заработать авторитет среди дворовых котов и даже собак? Серия Cat Energy Pro поможет вашему коту нарастить
            необходимые мышцы!
          </p>
          <Link className="features__link" to="/catalog">
            Каталог PRO <span className="features__link-icon"></span>
          </Link>
        </div>
        <span className="features__title-icon features__title-icon--pro features__title-icon--table"></span>
      </div>
    </div>
  );
};
