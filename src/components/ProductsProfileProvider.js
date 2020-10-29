import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateProduct, deleteProduct } from "../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { listProducts } from "../store/actions/productAction";
import { Pagination } from "@material-ui/lab";

export default function ProductsProfileProvider() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [productDecription, setProductDecription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  let category = "";

  useEffect(() => {
    dispatch(listProducts(category));
  }, []);

  const formatCurrency = (number) => {
    let res = new Intl.NumberFormat("en-CO").format(number);
    return res;
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const productsPerPage = 16;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleChangePage = function (event, page) {
    setCurrentPage(page);
  };

  function readFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setImage(e.target.result);
  }

  function handleImage(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      readFile(e.target.files[0]);
    }
  }

  const handleUpdateProduct = async (product) => {
    const dataImage = new FormData();
    dataImage.append("file", file, file.name);
    setProductId(product._id);
    const { data } = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "image",
      data: dataImage,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(
      updateProduct(product._id, {
        name: productName,
        image: data,
        decription: productDecription,
        quantity: productQuantity,
        price,
      })
    );
    window.location.reload(false);
  };

  return (
    <div className="vh-100 overflow-auto h-25">
      {currentProducts.map((product, index) => {
        const editCard = "editCard" + index;
        const editC = "#editCard" + index;
        const handleConfirm = (e) => {
          e.preventDefault();
          Swal.fire({
            title: "¿Quieres guardar los cambios?",
            showCancelButton: true,
            icon: "info",
            confirmButtonColor: "#28B463",
            confirmButtonText: "Si",
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Cambios guardados!", "", "success");
            }
          });
        };
        const handleConfirmDelete = (e) => {
          e.preventDefault();
          Swal.fire({
            title: "¿Quieres borrar este producto?",
            showCancelButton: true,
            icon: "info",
            confirmButtonColor: "#28B463",
            confirmButtonText: "Si",
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              deleteHandler(product._id);
              Swal.fire("Producto borrado!", "", "success");
              window.location.reload(false);
            }
          });
        };
        return (
          <div className="card mx-1 my-2" key={product._id}>
            <div className="card mx-1 my-1">
              <div className="row no-gutters">
                <div className="col-md-2 my-2 d-flex justify-content-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="100"
                    height="100"
                  />
                </div>
                <div className="col-md-10 mt-2">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col">
                          <h4 className="card-title font-weight-bolder">
                            {product.name}
                            <span
                              className="badge badge-pill badge-danger ml-2"
                              hidden={product.discount === 0}
                            >
                              {product.discount}%
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card-description">
                                <strong>Cantidad: </strong>
                                {product.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="row">
                            <div className="col-md-12">
                              <p className="card-description">
                                <strong>Descripción: </strong>
                                {product.decription}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <h5 className="card-description font-weight-bold">
                            Precio: ${formatCurrency(product.price)}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div>
                        <div className="row px-2 py-2">
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-success btn-block"
                              data-toggle="collapse"
                              aria-expanded="false"
                              aria-controls={editCard}
                              data-target={editC}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </div>
                        </div>
                        <div className="row px-2 py-2">
                          <div className="col">
                            <button
                              type="button"
                              onClick={handleConfirmDelete}
                              className="btn btn-danger btn-block"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mx-1 my-1 collapse" id={editCard}>
              <form onSubmit={handleConfirm}>
                <div className="form-row px-2 py-1">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName" className="font-weight-bolder">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={product.name}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row px-2 py-1">
                  <div className="form-group col-md-12">
                    <label
                      htmlFor="inputProductDescription"
                      className="font-weight-bolder"
                    >
                      Descripción
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputProductDescription"
                      placeholder={product.decription}
                      onChange={(e) => setProductDecription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group px-2 py-1">
                  <label
                    htmlFor="inputProductImage"
                    className="font-weight-bolder"
                  >
                    Imagen
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      name="file"
                      id="inputProductImage"
                      aria-describedby="inputProductImageA"
                      accept="image/*"
                      onChange={handleImage}
                      required
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputProductImage"
                    >
                      Escoja una imagen
                    </label>
                  </div>
                  {image ? (
                    <img
                      src={image}
                      className="img-thumbnail mx-1 my-1"
                      alt="imagen a subir"
                      width="100"
                      height="100"
                    />
                  ) : (
                    <img
                      src={product.image}
                      className="img-thumbnail mx-1 my-1"
                      alt="imagen a subir"
                      width="100"
                      height="100"
                    />
                  )}
                </div>
                <div className="form-row px-2 py-1">
                  <div className="form-group col-md-4">
                    <label
                      htmlFor="inputProductQuantity"
                      className="font-weight-bolder"
                    >
                      Cantidad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputProductQuantity"
                      placeholder={product.quantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label
                      htmlFor="inputProductDiscount"
                      className="font-weight-bolder"
                    >
                      Descuento
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputProductDiscount"
                      placeholder={product.discount}
                      onChange={(e) => setProductDiscount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label
                      htmlFor="inputProductPrice"
                      className="font-weight-bolder"
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputProductPrice"
                      placeholder={product.price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-warning ml-2 mb-2">
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        );
      })}
      <div className="d-flex justify-content-center">
        <Pagination
          count={totalPages}
          variant="outlined"
          color="secondary"
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
