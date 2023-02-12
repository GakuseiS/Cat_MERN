import React from "react";
import { Catalog, Supplement } from "./components";
import "./catalogPage.scss";

export const CatalogPage = () => {
  return (
    <div className="catalogPage">
      <h1 className="catalogPage__title">Каталог продукции</h1>
      <Catalog />
      <Supplement />
    </div>
  );
};
