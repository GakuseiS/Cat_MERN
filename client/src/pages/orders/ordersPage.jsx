import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components";
import "./ordersPage.scss";

export const OrdersPage = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const mountedRef = useRef(true);

  const setDate = (date) =>
    new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));

  const fetchOrders = async () => {
    try {
      const { data, status } = fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        if (!mountedRef.current) return null;
        setOrders(data.orders.order);
      }
    } catch (err) {
      console.error("Ошибка получения заказов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    return () => {
      mountedRef.current = false;
    };
  }, [token]);

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
        orders?.map((order) => {
          return (
            <div key={order._id}>
              <p>Время заказа {setDate(order.date)}</p>
              <ol>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.title} {item.size} {item.taste} {item.price} руб. - {item.count} шт.
                  </li>
                ))}
              </ol>
              <p>Общая цена: {order.allPrice} руб.</p>
            </div>
          );
        })}
      {!loading && !orders && <p>У вас нет заказов</p>}
    </div>
  );
};
