import React, { FormEvent, useContext } from "react";
import { Button } from "../index";
import { AuthContext } from "../../context/AuthContext";
import "./catalogItem.scss";
import ErrorContext from "../../context/ErrorContext";

interface CatalogItemProps {
  id: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: string;
}

export const CatalogItem = ({ id, title, img, size, taste, price }: CatalogItemProps) => {
  const { token } = useContext(AuthContext);
  const { errorMessage } = useContext(ErrorContext);

  const getId = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const res = await fetch("/api/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      errorMessage((await res.json()).message);
    } catch (err) {
      console.error("Ошибка заказа");
    }
  };
  return (
    <div className="catalogItem">
      <div className="catalogItem__wrapper">
        <img className="catalogItem__img" src={img} alt="pack" />
      </div>

      <h3 className="catalogItem__title">
        {title}
        <br />
        {size} Г
      </h3>
      <ul className="catalogItem__list">
        <li className="catalogItem__list-item">
          Объем <span>{size} г</span>
        </li>
        <li className="catalogItem__list-item">
          Вкус <span>{taste}</span>
        </li>
        <li className="catalogItem__list-item">
          Цена <span>{price} ₽</span>
        </li>
      </ul>
      <form onSubmit={getId}>
        <Button size="small" page="catalog">
          Заказать
        </Button>
      </form>
    </div>
  );
};
