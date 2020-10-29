import React from "react";
import { addToCart, removeFromCart } from "../store/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const customerSignIn = useSelector((state) => state.customerSignIn);
  const { customerInfo } = customerSignIn;
  const providerSignIn = useSelector((state) => state.providerSignIn);
  const { providerInfo } = providerSignIn;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    if (customerInfo || providerInfo) {
      props.history.push("/place-order");
    } else {
      props.history.push("/login");
    }
  };
  return (
    <div className="justify-content-center">
      <div className="card mx-5 my-5">
        <div className="card-header bg-white">
          <div className="Row">
            <div className="col-md-3">
              <Link to="/">
                <FontAwesomeIcon icon={faArrowCircleLeft} className="fa-3x" />
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="card-title border rounded bg-primary">
            <h2 className="ml-2 text-light">Carro de Compras</h2>
          </div>
          {cartItems.length === 0 ? (
            <h5>El carro está vacío</h5>
          ) : (
            cartItems.map((item) => (
              <div
                className="card mb-2 d-flex justify-content-center"
                key={item.product}
              >
                <div className="row no-gutters">
                  <div className="col-md-2 border-right d-flex justify-content-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="140"
                      height="140"
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="cart-header border-bottom d-flex justify-content-center">
                      <h5 className="card-title">
                        <Link
                          to={"/product/" + item.product}
                          className="text-decoration-none"
                        >
                          <h4 className="card-title mt-2">{item.name}</h4>
                        </Link>
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2 d-flex flex-row-reverse">
                          <h5 className="card-text">Cantidad:</h5>
                        </div>
                        <div className="col-md-2">
                          <select
                            className="custom-select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(addToCart(item.product, e.target.value))
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div className="col-md-5 d-flex flex-row-reverse">
                          <h3>$ {item.price}</h3>
                        </div>
                        <div className="col-md-3 d-flex flex-row-reverse">
                          <button
                            type="button"
                            className="btn btn-danger btn-block"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-3" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="card-footer bg-white">
          <div className="row">
            <div className="col-md-9">
              <h3>
                Subtotal (
                {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
                artículos) : ${" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h3>
            </div>
            <div className="col-md-3">
              {cartItems.length === 0 ? (
                <button
                  onClick={checkoutHandler}
                  className="btn btn-primary btn-block rounded-pill full-width"
                  disabled
                >
                  Pagar
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="btn btn-primary btn-block rounded-pill full-width"
                >
                  Pagar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
