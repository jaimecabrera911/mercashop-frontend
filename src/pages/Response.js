import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import { payOrder } from "../store/actions/orderAction";

export default function Response({ location }) {
  const [info, setInfo] = useState({});
  const order = JSON.parse(localStorage.getItem("order")) || null;
  const customerSignIn = useSelector((state) => state.customerSignIn);
  const { customerInfo } = customerSignIn;
  const providerSignIn = useSelector((state) => state.providerSignIn);
  const { providerInfo } = providerSignIn;
  const dispatch = useDispatch();
  let history = useHistory();
  const user = providerInfo ? providerInfo : customerInfo;

  const formatCurrency = (number) => {
    let res = new Intl.NumberFormat("en-CO").format(number);
    return res;
  };

  const handlePayOrder = (e) => {
    e.preventDefault();
    dispatch(
      payOrder({
        names: user.names,
        customer: order.customer,
        transactionNumber: info.x_ref_payco,
        email: user.email,
        date: info.x_fecha_transaccion,
        city: order.city,
        address: order.adress,
        products: info.x_description,
        payment: order.payment,
        itemsPrice: info.x_amount_base,
        taxPrice: info.x_tax,
        shippingPrice: order.shippingPrice,
        totalPrice: info.x_amount,
        status: info.x_transaction_state,
      })
    );
    history.push("/");
  };

  useEffect(() => {
    const { ref_payco } = queryString.parse(location.search);
    axios({
      method: "GET",
      url: `https://secure.epayco.co/validation/v1/reference/${ref_payco}`,
    }).then(({ data: { data } }) => {
      setInfo(data);
    });
  }, [location]);

  return (
    <div className="container">
      <div className="card mx-2 my-2">
        <div className="card-header bg-white">
          <h1 className="card-title">Transacción</h1>
        </div>
      </div>
      <div className="card my-1 mx-2">
        <div className="card-header">
          <h2>Número de Transacción: {info.x_ref_payco}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h6>Nombre del banco: </h6>
              <p>{info.x_bank_name}</p>
              <h6>Descripción: </h6>
              <p>{info.x_description}</p>
              <h6>Estado: </h6>
              <p>{info.x_response_reason_text}</p>
              <h6>Fecha y hora de transacción: </h6>
              <p>{info.x_fecha_transaccion}</p>
            </div>
            <div className="col">
              <h6>Número de aprobación: </h6>
              <p>{info.x_approval_code}</p>
              <h6>IVA: </h6>
              <p>$ {formatCurrency(info.x_tax)}</p>
              <h6>Valor sin IVA: </h6>
              <p>$ {formatCurrency(info.x_amount_base)}</p>
              <h5>Valor total: </h5>
              <h4>$ {formatCurrency(info.x_amount_ok)}</h4>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12 d-flex justify-content-center">
              <button
                className="btn btn-success btn-lg"
                onClick={handlePayOrder}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
