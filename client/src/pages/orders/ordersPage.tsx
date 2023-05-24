import React from "react";
import { useGetOrdersQuery } from "@src/api/order/order.queries";
import { Loader } from "@src/shared/loader";
import "./ordersPage.scss";

const setDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));

export const OrdersPage = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <div className="ordersPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="ordersPage">
      <h1 className="ordersPage__title">Заказы</h1>
      {orders?.map((order) => (
        <div key={order.id}>
          <p>Время заказа {setDate(order.createdAt)}</p>
          <ol>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.title} {item.size} {item.taste} {item.price} руб. - {item.count} шт.
              </li>
            ))}
          </ol>
          <p>Общая цена: {order.allPrice} руб.</p>
        </div>
      ))}
      {!orders?.length && <p>У вас нет заказов</p>}
    </div>
  );
};
