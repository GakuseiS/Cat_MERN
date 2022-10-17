import React, { useEffect, useState } from "react";
import { Button, CatalogItem, Loader } from "../index";
import "./catalog.scss";

type TCards = {
  id: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: string;
};

export const Catalog = () => {
  const [cards, setCards] = useState<TCards[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getCards = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/cards");
      if (res.status === 200) {
        setCards(await res.json());
      }
    } catch (err) {
      console.error("Ошибка загрузки карточек");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  if (loading) {
    return (
      <div className="catalog">
        <Loader />
      </div>
    );
  }

  return (
    <div className="catalog">
      {cards?.map((item) => (
        <CatalogItem
          key={item.id}
          title={item.title}
          img={item.img}
          size={item.size}
          taste={item.taste}
          price={item.price}
          id={item.id}
        />
      ))}
      <div className="catalog__more">
        <h3 className="catalog__more-title">
          Показать еще
          <br /> 100500 товаров
        </h3>
        <p className="catalog__more-text">На самом деле вкусов гораздо больше!</p>
        <Button size="small" color="gray">
          Показать всё
        </Button>
      </div>
    </div>
  );
};
