import React, { useEffect, useState } from "react";
import axios from "axios";
import Payed from "../components/Payed";
import NotPayed from "../components/NotPayed";

export default function OrdersProfile({ customerId, payed }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (customerId) {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "order/saved/" + customerId)
        .then(({ data }) => {
          setOrders(data);
        })
        .catch((err) => console.log("error: ", err));
    }
  }, [customerId]); 

  return (
    <div>
      {orders.map((order) => {
        if (payed) {
          return <Payed order={order} key={order.invoice} />;
        } else {
          return <NotPayed order={order} key={order.invoice} />;
        }
      })}
    </div>
  );
}
