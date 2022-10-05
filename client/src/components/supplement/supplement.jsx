import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import Button from "../button/button";
import "./supplement.scss";

const Supplement = () => {
  const { token } = useContext(AuthContext);
  const [addons, setAddons] = useState();
  const [loading, setLoading] = useState(true);
  const { errorMessage } = useContext(ErrorContext);
  const mountedRef = useRef(true);

  const getId = (evt) => {
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

  const getAddons = async () => {
    try {
      const { data, status } = await fetch("/api/addons");
      if (status === 200) {
        if (!mountedRef.current) return null;
        setAddons(data.addons);
        setLoading(false);
      }
    } catch (err) {
      console.log("Ошибка получения аддонов");
    }
  };

  useEffect(() => {
    getAddons();
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return (
    <div className="sup">
      <h2 className="sup__title">Дополнительные товары</h2>
      <div className="sup__content">
        <ul className="sup__list">
          {!loading &&
            addons.map((addon) => {
              return (
                <li key={addon._id} className="sup__list-item">
                  <span className="sup__item-title">{addon.title}</span> <span className="sup__size">{addon.size}</span>{" "}
                  <span className="sup__price">{addon.price} Р.</span>
                  <form className="sup__form" method="POST" onSubmit={getId} data-id={addon._id}>
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

export default Supplement;
