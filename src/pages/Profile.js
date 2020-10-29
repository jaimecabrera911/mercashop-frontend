import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { update } from "../store/actions/customerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import OrdersProfile from "./OrdersProfile";
import Swal from "sweetalert2";

export default function Profile(props) {
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
  const [isVerified, setIsVerified] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          "customer/" +
          props.match.params.id
      )
      .then(({ data }) => {
        setNames(data.names);
        setLastNames(data.lastNames);
        setIdType(data.idType);
        setIdNumber(data.idNumber);
        setEmail(data.email);
        setPhone(data.phone);
        setBirthDate(data.birthDate);
        setAdress(data.adress);
        setUserName(data.userName);
        setId(data._id);
        setIsVerified(data.isVerified);
      })
      .catch((err) => console.log("profile customer", err));
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
            userName
          )
        );
      }
    });
  };

  return (
    <div className="container">
      {!isVerified && (
        <div className="alert alert-danger mt-2" role="alert">
          Por favor revisa tu correo electrónico y confirma tu correo.
        </div>
      )}
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
            <div className="col">
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
                      className="fa-2x"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-1 text-white">Actualizar perfil</h3>
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
              <div className="form-group">
                <label htmlFor="inputUserName" className="font-weight-bolder">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUserName"
                  placeholder={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-info">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="card mx-2 my-1 border border-danger">
        <div className="accordion" id="accordionOrdersSaved">
          <div className="card">
            <div className="card-header bg-danger" id="orders">
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-danger"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <FontAwesomeIcon
                      icon={faCaretSquareDown}
                      className="fa-2x"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-1 text-white">Ordenes Guardadas</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="orders"
          data-parent="#accordionOrdersSaved"
        >
          <div className="card-body border-bottom">
            <OrdersProfile customerId={id} payed={false} />
          </div>
        </div>
      </div>
      <div className="card mx-2 my-1 border border-success">
        <div className="accordion" id="accordionOrdersPayed">
          <div className="card">
            <div className="card-header bg-success" id="orders">
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-success"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <FontAwesomeIcon
                      icon={faCaretSquareDown}
                      className="fa-2x"
                    />
                  </button>
                </div>
                <div className="col-md-11">
                  <h3 className="mt-1 text-white">Ordenes Pagadas</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="orders"
          data-parent="#accordionOrdersPayed"
        >
          <div className="card-body border-bottom">
            <OrdersProfile customerId={id} payed={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
