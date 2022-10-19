import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import { useAppSelector } from "../../hooks/store.hook";
import "./ordersPage.scss";

type TOrder = {
  id: string;
  createdAt: string;
  allPrice: number;
  items: {
    id: string;
    title: string;
    size: string;
    taste: string;
    price: string;
    count: string;
  }[];
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState<TOrder[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAppSelector((state) => state.login);

  const setDate = (date: string) =>
    new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error("Ошибка получения заказов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="ordersPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="ordersPage">
      <h1 className="ordersPage__title">Заказы</h1>
      {!loading &&
        orders?.map((order) => (
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
      {!loading && !orders?.length && <p>У вас нет заказов</p>}
    </div>
  );
};
