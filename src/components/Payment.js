import React from "react";

export default function Payment({ info }) {
  function handlePayment() {
    localStorage.removeItem("cartItems");
    const paymentHandler = window.ePayco.checkout.configure({
      key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
      test: true,
    });

    paymentHandler.open({
      external: "false",
      amount: `${info.amount}`,
      tax: `${info.tax}`,
      tax_base: `${info.tax_base}`,
      name: "Orden de compra",
      description: `${info.description}`,
      currency: "cop",
      country: "CO",
      lang: "es",
      invoice: `${info.invoice}`,
      response: `${process.env.REACT_APP_URL}response`,
      autoclick: "false",
      name_billing: `${info.name_billing}`,
      address_billing: `${info.address_billing}`,
      type_doc_billing: `${info.type_doc_billing}`,
      mobilephone_billing: `${info.mobilephone_billing}`,
      number_doc_billing: `${info.number_doc_billing}`,
    });
  }

  return (
    <div>
      <button className="btn btn-info btn-block" onClick={handlePayment}>
        Pagar
      </button>
    </div>
  );
}
