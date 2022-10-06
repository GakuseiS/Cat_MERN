import React, { useEffect, useState, useRef } from "react";
import { Button, CatalogItem, Loader } from "../index";
import "./catalog.scss";

type TCards = {
  _id: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: string;
};

export const Catalog = () => {
  const [cards, setCards] = useState<TCards[] | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const getCards = async () => {
    try {
      const { status, body } = await fetch("api/cards");
      if (status === 200) {
        if (!mountedRef.current) return null;
        setCards(body as any);
        setLoading(false);
      }
    } catch (err) {
      console.error("Ошибка загрузки карточек");
    }
  };

  useEffect(() => {
    getCards();
    return () => {
      mountedRef.current = false;
    };
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
          key={item._id}
          title={item.title}
          img={item.img}
          size={item.size}
          taste={item.taste}
          price={item.price}
          id={item._id}
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
