import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { update } from "../store/actions/providerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveProduct } from "../store/actions/productAction";
import OrdersProfileProvider from "./OrdersProfileProvider";
import ProductsProfileProvider from "../components/ProductsProfileProvider";
import Swal from "sweetalert2";

export default function ProfileProvider(props) {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [adress, setAdress] = useState("");

  const [businessName, setBusinesName] = useState("");
  const [nit, setNit] = useState(0);
  const [commerceType, setCommerceType] = useState("");
  const [webPage, setWebPage] = useState("");

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + "provider/" + props.match.params.id
      )
      .then(({ data }) => {
        setId(data._id);
        setNames(data.names);
        setLastNames(data.lastNames);
        setIdType(data.idType);
        setIdNumber(data.idNumber);
        setEmail(data.email);
        setPhone(data.phone);
        setBirthDate(data.birthDate);
        setAdress(data.adress);
        setBusinesName(data.businessName);
        setNit(data.nit);
        setCommerceType(data.commerceType);
        setWebPage(data.webPage);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
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
        dispatch(
          update(
            id,
            names,
            lastNames,
            idType,
            idNumber,
            email,
            phone,
            birthDate,
            adress,
            businessName,
            nit,
            commerceType,
            webPage
          )
        );
      }
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    const dataImage = new FormData();
    dataImage.append("file", file, file.name);

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
      saveProduct({
        name: productName,
        decription: productDescription,
        category: productCategory,
        image: data,
        quantity: productQuantity,
        price: productPrice,
        discount: productDiscount,
      })
    );

    Swal.fire({
      title: "Producto agregado exitosamente",
      icon: "success",
      confirmButtonColor: "#28B463",
      confirmButtonText: "Genial!!!",
    }).then((result) => {
      window.location.reload();
    });
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

  return (
    <div className="container">
      <div className="card mx-2 my-2">
        <div className="card-header bg-white">
          <div className="row">
            <div className="col">
              <Link to="/" className="text-decoration-none text-dark">
                <FontAwesomeIcon
                  className="fa-3x ml-2 mt-2"
                  icon={faArrowCircleLeft}
                />
              </Link>
            </div>
            <div className="col pt-2">
              <h1 className="card-title">Perfil</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="card mx-2 my-1 border border-info">
        <div className="accordion" id="accordionUpdate">
          <div className="card">
            <div className="card-header bg-info" id="updateProfile">
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-info"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <FontAwesomeIcon
                      icon={faCaretSquareDown}
                      className="fa-2x mt-1"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-2 text-white">Actualizar perfil</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="updateProfile"
          data-parent="#accordionUpdate"
        >
          <div className="card-body border-bottom">
            <form onSubmit={handleUpdate}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputName" className="font-weight-bolder">
                    Nombres
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail"
                    placeholder={names}
                    onChange={(e) => setNames(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputLastName" className="font-weight-bolder">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                    placeholder={lastNames}
                    onChange={(e) => setLastNames(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputIdType" className="font-weight-bolder">
                    Tipo de Identificación
                  </label>
                  <select
                    id="inputIdType"
                    className="form-control"
                    defaultValue={idType}
                    onChange={(e) => setIdType(e.target.value)}
                  >
                    <option value="predeterminado" disabled>
                      Seleccione una opción
                    </option>
                    <option value="Cedula de ciudadanía">
                      Cedula de ciudadanía
                    </option>
                    <option value="Cedula de extranjería">
                      Cedula de extranjería
                    </option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputIdNumber" className="font-weight-bolder">
                    Número de Identificación
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputIdNumber"
                    placeholder={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail" className="font-weight-bolder">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputPhone" className="font-weight-bolder">
                    Número telefónico
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPhone"
                    placeholder={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label
                    htmlFor="inputBirthDate"
                    className="font-weight-bolder"
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputBirthDate"
                    placeholder={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputAdress" className="font-weight-bolder">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAdress"
                    placeholder={adress}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label
                    htmlFor="inputBussinesName"
                    className="font-weight-bolder"
                  >
                    Razón Social
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputBussinesName"
                    placeholder={businessName}
                    onChange={(e) => setBusinesName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputNit" className="font-weight-bolder">
                    NIT
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputNit"
                    placeholder={nit}
                    onChange={(e) => setNit(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label
                    htmlFor="inputCommerceType"
                    className="font-weight-bolder"
                  >
                    Tipo de Comercio
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputCommerceType"
                    placeholder="Nombres"
                    defaultValue={commerceType}
                    onChange={(e) => setCommerceType(e.target.value)}
                  >
                    <option value="predeterminado" disabled>
                      Seleccione una opción
                    </option>
                    <option value="Restaurante">Restaurante</option>
                    <option value="Supermercado">Supermercado</option>
                    <option value="Licores">Licores</option>
                    <option value="Tiendas de conveniencia">
                      Tiendas de conveniencia
                    </option>
                    <option value="Mascotas">Mascotas</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-info">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="card mx-2 my-1 border border-success">
        <div className="accordion" id="accordionOrders">
          <div className="card">
            <div className="card-header bg-success" id="orders">
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-success"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <FontAwesomeIcon
                      icon={faCaretSquareDown}
                      className="fa-2x mt-1"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-2 text-white">Ordenes</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="orders"
          data-parent="#accordionOrders"
        >
          <div className="card-body border-bottom">
            <OrdersProfileProvider />
          </div>
        </div>
      </div>
      <div className="card mx-2 my-1 border border-danger">
        <div className="accordion" id="accordionProduct">
          <div className="card">
            <div className="card-header bg-danger" id="orders">
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-danger"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <FontAwesomeIcon
                      icon={faCaretSquareDown}
                      className="fa-2x mt-1"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-2 text-white">Productos</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="orders"
          data-parent="#accordionProduct"
        >
          <div className="card-body border-bottom overflow-auto h-25">
            <ProductsProfileProvider />
          </div>
        </div>
      </div>
      <div className="card mx-2 my-1 border border-warning">
        <div className="accordion" id="accordionCreateProduct">
          <div className="card">
            <div className="card-header bg-warning" id="orders">
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-warning"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <FontAwesomeIcon
                      icon={faCaretSquareDown}
                      className="fa-2x mt-1"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-2 text-dark">Agregar Producto</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="orders"
          data-parent="#accordionCreateProduct"
        >
          <div className="card-body border-bottom">
            <form onSubmit={handleSaveProduct}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputName" className="font-weight-bolder">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label
                    htmlFor="inputProductCategory"
                    className="font-weight-bolder"
                  >
                    Categoría
                  </label>
                  <select
                    id="inputProductCategory"
                    className="form-control"
                    defaultValue={"predeterminado"}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                  >
                    <option value="predeterminado" disabled>
                      Seleccione una opción
                    </option>
                    <option value="Lácteos y huevos">Lácteos y huevos</option>
                    <option value="Abarrotes">Abarrotes</option>
                    <option value="Panadería y Arepas">
                      Panadería y Arepas
                    </option>
                    <option value="Café, Chocolate y Té">
                      Café, Chocolate y Té
                    </option>
                    <option value="Galletas y Antojos">
                      Galletas y Antojos
                    </option>
                    <option value="Pollo, Carne y Pescado">
                      Pollo, Carne y Pescado
                    </option>
                    <option value="Carnes frías y Embutidos">
                      Carnes frías y Embutidos
                    </option>
                    <option value="Frutas y Verduras">Frutas y Verduras</option>
                    <option value="Licores">Licores</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Mascotas">Mascotas</option>
                    <option value="Aseo del hogar">Aseo del hogar</option>
                    <option value="Cuidado de la Ropa">
                      Cuidado de la Ropa
                    </option>
                    <option value="Cuidado personal">Cuidado personal</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
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
                    placeholder={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
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
                {image && (
                  <img
                    src={image}
                    className="img-thumbnail mx-1 my-1"
                    alt="imagen a subir"
                    width="100"
                    height="100"
                  />
                )}
              </div>
              <div className="form-row">
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
                    placeholder={productQuantity}
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
                    placeholder={productDiscount}
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
                    placeholder={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-warning">
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
