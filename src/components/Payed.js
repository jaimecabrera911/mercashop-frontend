import React from "react";

export default function Payed({ order }) {
  const formatCurrency = (number) => {
    let res = new Intl.NumberFormat("en-CO").format(number);
    return res;
  };
  if (order.isPaid) {
    return (
      <div className="card my-2 border border-dark">
        <div className="card-header bg-white">
          <h5 className="card-title mt-1">Orden Id: {order.invoice}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-title">Productos</h6>
          {order.products.map((product) => {
            return (
              <div className="card" key={product._id}>
                <div className="row no-gutters">
                  <div className="col-md-2 d-flex justify-content-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="col-md-10">
                    <h6 className="card-title font-weight-bolder">
                      {product.name}
                    </h6>
                    <p className="card-description">
                      Cantidad: {product.quantity}
                    </p>
                    <p className="card-description font-weight-bold">
                      Precio: $ {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <h6 className="card-title mt-1">
            Dirección de envío: {order.adress || ""}
          </h6>
          <h6 className="card-title">Metodo de pago: {order.payment}</h6>
          <h6 className="card-title">
            Precio de envío: $ {formatCurrency(order.shippingPrice)}
          </h6>
          <h6 className="card-title">
            IVA: $ {formatCurrency(order.taxPrice)}
          </h6>
          <h6 className="card-title">
            Precio sin IVA: $ {formatCurrency(order.itemsPrice)}
          </h6>
          <h5 className="card-title">
            Precio Total: $ {formatCurrency(order.totalPrice)}
          </h5>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
