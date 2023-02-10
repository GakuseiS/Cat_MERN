import React, { FormEventHandler } from "react";
import { Button } from "@src/UI";
import { setMessage } from "@src/store/errorSlice";
import { useAppDispatch } from "@src/hooks/store.hook";
import { usePostProductMutation } from "@src/api/product";
import "./catalogItem.scss";

interface CatalogItemProps {
  id: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: number;
}

export const CatalogItem = ({ id, title, img, size, taste, price }: CatalogItemProps) => {
  const dispatch = useAppDispatch();
  const [postProduct] = usePostProductMutation();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    try {
      const data = await postProduct({ id }).unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
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
      <form onSubmit={submitHandler}>
        <Button size="small" page="catalog">
          Заказать
        </Button>
      </form>
    </div>
  );
};
