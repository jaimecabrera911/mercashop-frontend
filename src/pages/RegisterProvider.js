import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./../assets/images/Merca Shop letters.png";
import { Link } from "react-router-dom";
import { register } from "../store/actions/providerAction";
import Swal from "sweetalert2";
import { Animated } from "react-animated-css";

export default function RegisterProvider(props) {
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
  const [commerceType, setComerceType] = useState("");
  const [webPage, setWebPage] = useState("");
  const [password, setPassword] = useState("");
  const providerRegister = useSelector((state) => state.providerRegister);
  const { loading, providerInfo, error } = providerRegister;
  const dispatch = useDispatch();

  if (providerInfo) {
    props.history.push("/");
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(
      register(
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
        webPage,
        password
      )
    );
    Swal.fire({
      title: "Ingreso exitoso",
      icon: "success",
      confirmButtonColor: "#28B463",
      confirmButtonText: "Genial!!! volver a inicio.",
    }).then((result) => {
      window.location.reload(false);
    });
  };

  return (
    <div className="d-flex justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center">
          <h4>Cargando...</h4>
        </div>
      ) : error ? (
        <div className="d-flex justify-content-center">
          <h4>Algo salió mal...</h4>
        </div>
      ) : (
        <div className="card bg-white my-5">
          <div className="card-header bg-white border-bottom-0 text-center">
            <Animated
              animationIn="tada"
              animationOut="zoomOutDown"
              animationInDuration={1000}
              animationOutDuration={1000}
              isVisible={true}
            >
              <img
                src={logo}
                className="mb-2"
                width="190"
                height="190"
                alt="mercashop"
              />
            </Animated>
            <h1 className="h3 mb-3 font-weight-normal">Registro Proveedor</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputName" className="font-weight-bold">
                    Nombres
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Nombres"
                    onChange={(e) => setNames(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputName" className="font-weight-bold">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Apellidos"
                    onChange={(e) => setLastNames(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputId" className="font-weight-bold">
                    Tipo Identificación
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputId"
                    placeholder="Identificaciones"
                    defaultValue={"predeterminado"}
                    onChange={(e) => setIdType(e.target.value)}
                  >
                    <option value="predeterminado" default>
                      Seleccione una opción
                    </option>
                    <option value="Cedula de ciudadanía">
                      Cedula de ciudadanía
                    </option>
                    <option value="Psaporte">Pasaporte</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputIdNumber" className="font-weight-bold">
                    Número de Identificación
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputIdNumber"
                    placeholder="Identificación"
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="inputEmail" className="font-weight-bold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Correo Electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputPhone" className="font-weight-bold">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPhone"
                    placeholder="Teléfono"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputBirthDate" className="font-weight-bold">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputBirthDate"
                    placeholder="Fecha de Nacimiento"
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputAdress" className="font-weight-bold">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAdress"
                    placeholder="Dirección"
                    onChange={(e) => setAdress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label
                    htmlFor="inputBussinessName"
                    className="font-weight-bold"
                  >
                    Razón Social
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputBussinessName"
                    placeholder="Razón Social"
                    onChange={(e) => setBusinesName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputNIT" className="font-weight-bold">
                    NIT
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputNIT"
                    placeholder="Sin dígito de verificación"
                    onChange={(e) => setNit(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label
                    htmlFor="inputCommerceType"
                    className="font-weight-bold"
                  >
                    Tipo de Comercio
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputCommerceType"
                    placeholder="Nombres"
                    defaultValue={"predeterminado"}
                    onChange={(e) => setComerceType(e.target.value)}
                  >
                    <option value="predeterminado">
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
                <div className="form-group col-md-6">
                  <label htmlFor="inputWeb" className="font-weight-bold">
                    Página Web
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputWeb"
                    name="paginaWeb"
                    placeholder="Página web"
                    onChange={(e) => setWebPage(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="inputPassword" className="font-weight-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-info mt-2 btn-lg btn-block rounded-pill"
                  >
                    Registrarse
                  </button>
                </div>
                <div className="col">
                  <Link to="/login" className="text-decoration-none">
                    <button className="btn btn-danger mt-2 btn-lg btn-block rounded-pill">
                      Cancelar
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
