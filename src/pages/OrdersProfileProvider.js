import React, { useEffect, useState } from "react";
import axios from "axios";
import Payed from "../components/Payed";

export default function OrdersProfileProvider() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "order/")
        .then(({ data }) => {
          setOrders(data);
        })
        .catch((err) => console.log("error: ", err));
  }, []);

  return (
    <div>
      {orders.map((order) => {
        return <Payed order={order} key={order.invoice} />;
      })}
    </div>
  );
}
