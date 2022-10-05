import React, { useEffect, useState, useRef } from "react";
import Button from "../button/button";
import CatalogItem from "../catalogItem/catalogItem";
import Loader from "../loader/loader";
import "./catalog.scss";

const Catalog = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const getCards = async () => {
    try {
      const { status, data } = await fetch("api/cards");
      if (status === 200) {
        if (!mountedRef.current) return null;
        setCards(data);
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

export default Catalog;
