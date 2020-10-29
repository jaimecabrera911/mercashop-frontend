import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveShipping, savePayment } from "../store/actions/cartAction";
import { createOrder } from "../store/actions/orderAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Payment from "../components/Payment";
import axios from "axios";

export default function PlaceOrder(props) {
  const customerSignIn = useSelector((state) => state.customerSignIn);
  const { customerInfo } = customerSignIn;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const country = "Colombia";
  const [payment, setPayment] = useState("");
  const [progress, setProgress] = useState(0);
  const [customerData, setCustomerData] = useState({});
  const dispatch = useDispatch();

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = (itemsPrice * 15) / 100;
  const taxPrice = (itemsPrice * 4) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const description = cartItems.map((item) => " " + item.name).toString();
  const items = cartItems.map((item) => item.product);
  const invoice = customerData.orders ? customerData.orders.length + 1 : 1;
  const customer = customerInfo._id;
  const [enable, setEnable] = useState(false);

  const idType = (type) => {
    switch (type) {
      case "Cedula de ciudadanía":
        return "CC";
      case "Cedula de extranjería":
        return "CE";
      case "Pasaporte":
        return "CPPN";
      default: 
        return "CC";
    }
  };

  const data = {
    name: customerInfo.names,
    description: description,
    invoice: invoice,
    amount: totalPrice,
    tax: taxPrice,
    tax_base: itemsPrice,
    name_billing: customerInfo.names,
    address_billing: customerData.adress,
    type_doc_billing: idType(customerData.idType),
    mobilephone_billing: customerData.phone,
    number_doc_billing: customerData.idNumber,
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "customer/" + customerInfo._id)
      .then(({ data }) => {
        setCustomerData(data);
      });
  }, []);

  const formatCurrency = (number) => {
    let res = new Intl.NumberFormat("en-CO").format(number);
    return res;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
  };

  const handleShippingPayment = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ adress, city, country }));
    dispatch(savePayment({ payment }));
    setEnable(true);
    dispatch(
      createOrder({
        products: items,
        adress,
        city,
        payment,
        itemsPrice,
        customer,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Orden Guardada",
      icon: "success",
      confirmButtonColor: "#28B463",
      confirmButtonText: "Genial!!! volver a inicio.",
    }).then((result) => {
      props.history.push("/");
      localStorage.removeItem("orderId");
    });
  };

  return (
    <div className="justify-content-center">
      <div className="card mx-4 my-4">
        <div className="card-header bg-white">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <form className="was-validated" onSubmit={handlePlaceOrder}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card mx-1 my-2">
                  <div className="card-header bg-info">
                    <h4 className="mt-1 text-white">Información de Envío</h4>
                  </div>
                  <div className="card-body bg-white">
                    <label className="mx-2 my-2" htmlFor="selectCity">
                      Selecciona una ciudad:
                    </label>
                    <select
                      type="text"
                      className="custom-select"
                      id="inlineFormCustomSelect"
                      onChange={(e) => {
                        setCity(e.target.value);
                        setProgress(progress + 33.3);
                      }}
                      required
                    >
                      <option value="">Escoge una...</option>
                      <option value="Bogotá"> Bogotá </option>
                      <option value="Barranquilla"> Barranquilla </option>
                      <option value="Chía"> Chía </option>
                      <option value="Cajicá"> Cajicá </option>
                      <option value="Medellín"> Medellín </option>
                      <option value="Cali"> Cali </option>
                      <option value="Cartagena"> Cartagena </option>
                      <option value="Cota"> Cota </option>
                      <option value="Bucaramanga"> Bucaramanga </option>
                      <option value="Pereira"> Pereira </option>
                      <option value="La Calera"> La Calera </option>
                      <option value="Manizales"> Manizales </option>
                      <option value="Armenia"> Armenia </option>
                      <option value="Rionegro"> Rionegro </option>
                      <option value="Pasto"> Pasto </option>
                      <option value="Neiva"> Neiva </option>
                      <option value="Santa Marta"> Santa Marta </option>
                      <option value="Valledupar"> Valledupar </option>
                      <option value="Ibagué"> Ibagué </option>
                      <option value="Villavicencio"> Villavicencio </option>
                      <option value="Tunja"> Tunja </option>
                      <option value="Girardot"> Girardot </option>
                      <option value="Fusagasugá"> Fusagasugá </option>
                      <option value="Mosquera"> Mosquera </option>
                    </select>
                    <label className="mx-2 my-2" htmlFor="inputAddress">
                      Dirección:
                    </label>
                    <input
                      type="text"
                      className="form-control is-invalid"
                      aria-describedby="inputAddress"
                      onChange={(e) => {
                        setAdress(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mx-1 my-2">
                  <div className="card-header bg-info">
                    <h4 className="mt-1 text-white">Forma de pago</h4>
                  </div>
                  <div className="card-body bg-white">
                    <label htmlFor="selectPaymentMethod">Metodo de pago:</label>
                    <select
                      type="text"
                      className="custom-select"
                      id="inlineFormCustomSelect"
                      defaultValue={"predeterminado"}
                      onChange={(e) => {
                        setPayment(e.target.value);
                        setProgress(progress + 33.4);
                      }}
                      required
                    >
                      <option value="">Escoge una...</option>
                      <option value="Amex"> Amex </option>
                      <option value="Mastercard"> Mastercard </option>
                      <option value="Visa"> Visa </option>
                      <option value="Tarjeta de Credito o Debito">
                        {" "}
                        Tarjeta de Credito o Debito{" "}
                      </option>
                      <option value="Efectivo"> Efectivo </option>
                    </select>
                  </div>
                </div>
                <button
                  className="btn btn-success mt-4 btn-lg btn-block"
                  onClick={handleShippingPayment}
                >
                  Confirmar
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card mx-2 my-2">
                  <div className="card-header bg-info">
                    <h4 className="mt-1 text-white">Hacer el pedido</h4>
                  </div>
                  <div className="card-body bg-white">
                    <div className="card mx-1 my-2">
                      <div className="card-body">
                        <h4>Resumen del Pedido</h4>
                        <ul>
                          <li>
                            <h6 className="card-text">
                              Cantidad de Items: {cartItems.length}
                            </h6>
                          </li>
                          <li>
                            <h6 className="card-text">
                              Subtotal: ${formatCurrency(itemsPrice)}
                            </h6>
                          </li>
                          <li>
                            <h6 className="card-text">
                              Cuota del servicio: ${formatCurrency(taxPrice)}{" "}
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                data-toggle="tooltip"
                                data-placement="right"
                                title="Esta tarifa nos ayuda a proporcionar el mejor servicio posible."
                              />
                            </h6>
                          </li>
                          <li>
                            <h6 className="card-text">
                              Costo de envío: ${formatCurrency(shippingPrice)}
                            </h6>
                          </li>
                        </ul>
                        <h5 className="card-text">
                          Valor Total: ${formatCurrency(totalPrice)}
                        </h5>
                      </div>
                      <div className="card-body mx-1 my-1">
                        {cartItems.length === 0 ? (
                          <div className="card-title">
                            <h6>El carrito está vacío.</h6>
                          </div>
                        ) : (
                          cartItems.map((item) => (
                            <div
                              className="card mb-2 d-flex justify-content-center"
                              key={item.product}
                            >
                              <div className="row no-gutters">
                                <div className="col-md-4 my-1 border-right d-flex justify-content-center">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    width="90"
                                    height="90"
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-8 mb-0 d-flex flex-row">
                                        <h5 className="card-title">
                                          <Link
                                            to={"/product/" + item.product}
                                            className="text-decoration-none"
                                          >
                                            <h5 className="card-title mb-0 mt-1">
                                              {item.name}
                                            </h5>
                                          </Link>
                                        </h5>
                                      </div>
                                      <div className="col-md-4 mb-0 d-flex flex-row-reverse">
                                        <h5>$ {item.price}</h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" disabled>
                  <div className="col-md-6 ">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={handleSaveOrder}
                    >
                      Guardar
                    </button>
                  </div>
                  <div className="col-md-6">
                    {enable ? (
                      <Payment info={data} />
                    ) : (
                      <button className="btn btn-info btn-block" disabled>
                        Pagar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
