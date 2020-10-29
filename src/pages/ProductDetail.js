import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  detailsProduct,
  saveProductReview,
} from "../store/actions/productAction";
import { addToCart } from "../store/actions/cartAction";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../store/constants/productConstants";

function ProductDetail(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  const customerSignIn = useSelector((state) => state.customerSignIn);
  const { customerInfo } = customerSignIn;

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Calificación enviada exitosamente.");
      setRating(1);
      setComment("");

      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
  }, [productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveProductReview(props.match.params.id, {
        name: customerInfo.names,
        rating,
        comment,
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(addToCart(props.match.params.id, qty));
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div className="justify-content-center">
      <div className="card mx-5 my-5">
        <div className="card-header bg-white border-bottom text-left">
          <div className="Row">
            <div className="col">
              <Link to="/" className="text-decoration-none text-dark">
                <FontAwesomeIcon icon={faArrowCircleLeft} className="fa-3x" />
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Cargando...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className="card-body bg-white border-bottom-0 text-center">
              <div className="row no-gutters">
                <div className="col-md-4 border">
                  <img
                    src={product.image}
                    alt={product.title}
                    weight="210"
                    height="210"
                  ></img>
                </div>
                <div className="col-md-8 border text-left">
                  <div className="mt-2 ml-2">
                    <h4>{product.name}</h4>
                  </div>
                  <p className="ml-2">Descripción: {product.decription}</p>
                  <div className="details-action ml-2">
                    <h4>
                      Precio: <b>$ {product.price}</b>
                    </h4>
                    <div>
                      <Rating
                        value={product.rating}
                        text={
                          product.numReviews === 1
                            ? product.numReviews + " calificación"
                            : product.numReviews + " calificaciones"
                        }
                      />
                    </div>
                    <p>
                      Cantidad:{" "}
                      <select
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </p>
                    <p>
                      <button
                        onClick={handleAddToCart}
                        className="btn btn-primary btn-sm rounded-pill"
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faShoppingCart}
                        />
                        Agregar al Carro
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white mt-2">
              <div className="card-header bg-white">
                <h2>Opiniones</h2>
              </div>
              <div className="card-body bg-white">
                <div className="row">
                  <h3>Escribe una opinión</h3>
                </div>
                <div className="row">
                  <div className="col">
                    {customerInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label htmlFor="rating">Calificación</label>
                          <select
                            className="form-control"
                            name="rating"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="1">1 - Malo</option>
                            <option value="2">2 - Regular</option>
                            <option value="3">3 - Bueno</option>
                            <option value="4">4 - Muy bueno</option>
                            <option value="5">5 - Excelente</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="comment">Comentario</label>
                          <textarea
                            className="form-control"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Enviar
                        </button>
                      </form>
                    ) : (
                      <div className="card">
                        <h5 className="card-title mx-2 my-2">
                          Por favor <Link to="/login" className="stretched-link">inicia sesión</Link> para
                          enviar una calificación.
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!product.reviews.length && <div>No hay opiniones</div>}
              {product.reviews.map((review) => (
                <div className="card my-1" key={review._id}>
                  <div className="card-header bg-info">
                    <h4 className="card-title text-white mt-1 mb-0">
                      {review.name}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <Rating value={review.rating} />
                    </div>
                    <h6 className="card-subtitle text-muted mb-2">
                      {review.createdAt.substring(0, 10)}
                    </h6>
                    <p className="card-text">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
