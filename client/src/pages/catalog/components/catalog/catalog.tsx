import React from "react";
import { CatalogItem, Loader } from "../../../../components";
import { useGetMainProductsQuery } from "../../../../api/product";
import { Button } from "../../../../UI";
import "./catalog.scss";

export const Catalog = () => {
  const { data: cards, isLoading } = useGetMainProductsQuery();

  if (isLoading) {
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
