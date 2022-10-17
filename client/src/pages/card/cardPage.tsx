import React, { useContext, useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Loader } from "../../components";
import "./cardPage.scss";

type TCard = {
  id: number;
  allPrice: number;
  items?: {
    id: string;
    title: string;
    size: string;
    taste: string;
    price: string;
    count: string;
  }[];
};

export const CardPage = () => {
  let history = useNavigate();
  const { token } = useContext(AuthContext);
  const [card, setCard] = useState<TCard | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBasket = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/card", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setCard(await res.json());
      }
    } catch (err) {
      console.error("Ошибка получения корзины");
    } finally {
      setLoading(false);
    }
  };

  const clearCard = async (evt: FormEvent) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/card", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Ошибка очищения корзины");
    } finally {
      setLoading(false);
      fetchBasket();
    }
  };

  const deleteItem = async (evt: any) => {
    setLoading(true);
    try {
      await fetch("/api/card/" + evt.target.dataset.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Ошибка удаления из корзины");
    } finally {
      setLoading(false);
      fetchBasket();
    }
  };

  const postOrder = async (evt: any) => {
    evt.preventDefault();
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: card?.id }),
      });
      if (res.status === 200) {
        history("/orders");
      }
    } catch (err) {
      console.error("Ошибка отправки заказа");
    }
  };

  useEffect(() => {
    fetchBasket();
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
      {card?.allPrice ? (
        <div>
          <ol className="cardPage__list">
            {card?.items?.map((item) => (
              <li key={item.id} className="cardPage__item">
                {item.title} {item.size} {item.taste} - {item.price} руб. - {item.count} шт.
                <button title="Удалить из корзины" data-id={item.id} onClick={deleteItem} className="cardPage__delete">
                  X
                </button>
              </li>
            ))}
          </ol>
          {<p className="cardPage__price">Общая стоимость: {card?.allPrice} руб.</p>}
          <form className="cardPage__order" method="POST" onSubmit={postOrder}>
            <Button>Сделать заказ</Button>
          </form>
          <form className="cardPage__clear" method="POST" onSubmit={clearCard}>
            <Button>Очистить корзину</Button>
          </form>
        </div>
      ) : null}
      {card?.allPrice === 0 ? <p>Ваша корзина пуста</p> : null}
    </div>
  );
};
