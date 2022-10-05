import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Loader } from "../../components";
import "./cardPage.scss";

export const CardPage = () => {
  let history = useNavigate();
  const { token } = useContext(AuthContext);
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const getCard = async () => {
    try {
      const { data, status } = fetch("/api/card", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        if (!mountedRef.current) return null;
        setCard(data.basket);
      }
    } catch (err) {
      console.error("Ошибка получения корзины");
    } finally {
      setLoading(false);
    }
  };

  const clearCard = async (evt) => {
    evt.preventDefault();
    try {
      const { status } = await fetch("/api/card", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        setLoading(true);
      }
    } catch (err) {
      console.error("Ошибка очищения корзины");
    }
  };

  const deleteItem = async (evt) => {
    try {
      const { status } = await fetch("/api/card/" + evt.target.dataset.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        setLoading(true);
      }
    } catch (err) {
      console.error("Ошибка удаления из корзины");
    }
  };

  const postOrder = async (evt) => {
    evt.preventDefault();
    try {
      const { status } = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(card),
      });
      if (status === 200) {
        history("/orders");
      }
    } catch (err) {
      console.error("Ошибка отправки заказа");
    }
  };

  useEffect(() => {
    getCard();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="cardPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="cardPage">
      <h1 className="cardPage__title">Корзина</h1>
      {!loading && card?.allPrice !== 0 && (
        <div>
          <ol className="cardPage__list">
            {card.items.map((item) => (
              <li key={item._id} className="cardPage__item">
                {item.title} {item.size} {item.taste} - {item.price} руб. - {item.count} шт.
                <button title="Удалить из корзины" data-id={item._id} onClick={deleteItem} className="cardPage__delete">
                  X
                </button>
              </li>
            ))}
          </ol>
          {<p className="cardPage__price">Общая стоимость: {card.allPrice} руб.</p>}
          <form className="cardPage__order" method="POST" onSubmit={postOrder}>
            <Button>Сделать заказ</Button>
          </form>
          <form className="cardPage__clear" method="POST" onSubmit={clearCard}>
            <Button>Очистить корзину</Button>
          </form>
        </div>
      )}
      {!loading && card.allPrice === 0 ? <p>Ваша корзина пуста</p> : null}
    </div>
  );
};
