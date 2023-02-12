import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@src/app/lib/store.hook";
import { useGetBasketQuery, useDeleteBasketMutation, useDeleteBasketItemMutation } from "@src/shared/api/card";
import { usePostOrderMutation } from "@src/shared/api/order";
import { setMessage } from "@src/entities/toast/model/toastSlice";
import { Button } from "@src/shared";
import { Loader } from "@src/shared/loader";
import "./cartPage.scss";

export const CartPage = () => {
  let history = useNavigate();
  const { data: cartList, isLoading } = useGetBasketQuery();
  const [clearCard] = useDeleteBasketMutation();
  const [deleteItem] = useDeleteBasketItemMutation();
  const [postOrder] = usePostOrderMutation();
  const dispatch = useAppDispatch();

  const clearCardHandler = async () => {
    try {
      const data = await clearCard().unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка очищения корзины");
    }
  };

  const deleteItemHandler: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    const id = (evt.target as HTMLButtonElement).dataset.id;
    if (id) {
      try {
        const data = await deleteItem({ id }).unwrap();
        dispatch(setMessage(data.message));
      } catch (err: any) {
        dispatch(setMessage(err.data?.message));
        console.error("Ошибка удаления из корзины");
      }
    }
  };

  const postOrderHandler = async () => {
    if (cartList?.id) {
      try {
        await postOrder({ id: cartList.id });
        history("/orders");
      } catch (err: any) {
        dispatch(setMessage(err.data?.message));
        console.error("Ошибка отправки заказа");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="cartPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="cartPage">
      <h1 className="cartPage__title">Корзина</h1>
      {cartList?.allPrice ? (
        <div>
          <ol className="cartPage__list">
            {cartList.items?.map((pruduct) => (
              <li key={pruduct.id} className="cartPage__item">
                {pruduct.title} {pruduct.size} {pruduct.taste} - {pruduct.price} руб. - {pruduct.count} шт.
                <button
                  title="Удалить из корзины"
                  data-id={pruduct.id}
                  onClick={deleteItemHandler}
                  className="cartPage__delete"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
          {<p className="cartPage__price">Общая стоимость: {cartList?.allPrice} руб.</p>}
          <Button onClick={postOrderHandler}>Сделать заказ</Button>
          <Button className="cartPage__clear" onClick={clearCardHandler}>
            Очистить корзину
          </Button>
        </div>
      ) : null}
      {cartList?.allPrice === 0 ? <p>Ваша корзина пуста</p> : null}
    </div>
  );
};
