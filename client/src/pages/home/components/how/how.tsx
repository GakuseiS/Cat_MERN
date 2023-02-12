import React from "react";
import "./how.scss";

export const How = () => {
  return (
    <div className="how">
      <h2 className="how__title">Как это работает</h2>
      <ul className="how__list">
        <li className="how__item one">
          <span className="how__icon one"></span>
          <p className="how__text">Функциональное питание содержит только полезные питательные вещества.</p>
        </li>
        <li className="how__item two">
          <span className="how__icon two"></span>
          <p className="how__text">Выпускается в виде порошка, который нужно лишь залить кипятком и готово.</p>
        </li>
        <li className="how__item three">
          <span className="how__icon three"></span>
          <p className="how__text">Замените один-два приема обычной еды на наше фунцкциональное питание.</p>
        </li>
        <li className="how__item four">
          <span className="how__icon four"></span>
          <p className="how__text">
            Уже через месяц наслаждайтесь изменениями к лучшему
            <br /> вашего питомца!
          </p>
        </li>
      </ul>
    </div>
  );
};
