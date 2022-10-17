import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import { Button } from "../index";
import "./supplement.scss";

type TAddon = {
  id: string;
  title: string;
  price: string;
  size: string;
};

export const Supplement = () => {
  const { token } = useContext(AuthContext);
  const [addons, setAddons] = useState<TAddon[] | null>(null);
  const { errorMessage } = useContext(ErrorContext);

  const sendSupplementToCard: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const id = evt.currentTarget.dataset.id;

    fetch("/api/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => errorMessage(data.message));
  };

  const getAddons = async (signal: AbortSignal) => {
    try {
      const res = await fetch("/api/addons", { signal });
      if (res.status === 200) {
        setAddons(await res.json());
      }
    } catch (err) {
      console.log("Ошибка получения аддонов");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getAddons(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="sup">
      <h2 className="sup__title">Дополнительные товары</h2>
      <div className="sup__content">
        <ul className="sup__list">
          {addons?.map((addon) => {
            return (
              <li key={addon.id} className="sup__list-item">
                <span className="sup__item-title">{addon.title}</span> <span className="sup__size">{addon.size}</span>{" "}
                <span className="sup__price">{addon.price} ₽</span>
                <form className="sup__form" method="POST" onSubmit={sendSupplementToCard} data-id={addon.id}>
                  <Button page="catalog">Заказать</Button>
                </form>
              </li>
            );
          })}
        </ul>
        <div className="sup__all">
          <p className="sup__all-text">
            Закажите все
            <br /> и получите чехол для кота в подарок!
          </p>
        </div>
      </div>
    </div>
  );
};
