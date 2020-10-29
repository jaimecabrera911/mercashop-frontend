import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addToCart } from "../store/actions/cartAction";
import { useDispatch } from "react-redux";
import Rating from "./Rating";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, 1));
  };

  const formatCurrency = (number) => {
    let res = new Intl.NumberFormat("en-CO").format(number);
    return res;
  };

  const {
    image,
    name,
    index,
    discount,
    quantity,
    price,
    _id,
    rating,
  } = product;
  return (
    <div className="container col-3">
      <div className="card mt-4 mr-2 p-3" style={{ height: 410 }} key={index}>
        <div className="card-header bg-white">
          <Link to={"/product/" + _id}>
            <img className="card-img-top" src={image} alt={name} />
          </Link>
        </div>
        <div className="card-body p-1 text-center">
          <h6 className="card-title">
            <Link
              className="text-decoration-none text-dark"
              to={"product/" + _id}
            >
              <strong>{name}</strong>
            </Link>
            <span
              className="badge badge-pill badge-danger ml-1"
              hidden={discount === 0}
            >
              {discount}%
            </span>
          </h6>
          <p className="font-weight-light">{quantity}</p>
        </div>
        <div className="card-footer bg-white">
          <div className="d-flex justify-content-center">
            <h5 style={{ color: "#1C1516" }}>
              <strong>$ {formatCurrency(price)}</strong>
            </h5>
          </div>
          <div className="d-flex justify-content-center">
            <Rating value={rating} />
          </div>
          <div>
            <button
              className="btn btn-outline-primary btn-sm rounded-pill btn-block mb-0"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
