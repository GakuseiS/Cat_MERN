import React, { FormEventHandler, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@src/components";
import { useAppDispatch } from "@src/hooks/store.hook";
import { useGetBasketQuery, useDeleteBasketMutation, useDeleteBasketItemMutation } from "@src/api/card";
import { usePostOrderMutation } from "@src/api/order";
import { setMessage } from "@src/store/errorSlice";
import { Button } from "@src/UI";
import "./cardPage.scss";

export const CardPage = () => {
  let history = useNavigate();
  const { data: card, isLoading } = useGetBasketQuery();
  const [clearCard] = useDeleteBasketMutation();
  const [deleteItem] = useDeleteBasketItemMutation();
  const [postOrder] = usePostOrderMutation();
  const dispatch = useAppDispatch();

  const clearCardHandler: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
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

  const postOrderHandler: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (card?.id) {
      try {
        await postOrder({ id: card.id });
        history("/orders");
      } catch (err: any) {
        dispatch(setMessage(err.data?.message));
        console.error("Ошибка отправки заказа");
      }
    }
  };

  if (isLoading) {
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
                <button
                  title="Удалить из корзины"
                  data-id={item.id}
                  onClick={deleteItemHandler}
                  className="cardPage__delete"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
          {<p className="cardPage__price">Общая стоимость: {card?.allPrice} руб.</p>}
          <form className="cardPage__order" method="POST" onSubmit={postOrderHandler}>
            <Button>Сделать заказ</Button>
          </form>
          <form className="cardPage__clear" method="POST" onSubmit={clearCardHandler}>
            <Button>Очистить корзину</Button>
          </form>
        </div>
      ) : null}
      {card?.allPrice === 0 ? <p>Ваша корзина пуста</p> : null}
    </div>
  );
};
