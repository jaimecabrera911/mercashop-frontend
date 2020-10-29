import React, { useState, useEffect } from "react";
import logo from "./../assets/images/Merca Shop letters.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/actions/customerAction";
import Swal from "sweetalert2";
import { Animated } from "react-animated-css";

export default function RegisterCostumer(props) {
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [adress, setAdress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const customerRegister = useSelector((state) => state.customerRegister);
  const { customerInfo } = customerRegister;
  const providerSignIn = useSelector((state) => state.providerSignIn);
  const { providerInfo } = providerSignIn;
  const dispatch = useDispatch();

  useEffect(() => {
    if (customerInfo || providerInfo) {
      console.log(customerInfo);
      console.log(providerInfo);
      
    }
  }, [customerInfo, providerInfo]);

  const handleRegister = (e) => {
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
        userName,
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
      <div className="card bg-white my-5 border">
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
          <h1 className="h3 mb-3 font-weight-normal">Registro Cliente</h1>
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
                  placeholder="Nombres"
                  defaultValue={"predeterminado"}
                  onChange={(e) => setIdType(e.target.value)}
                  required
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
                  id="inputEmail"
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
                <label htmlFor="inputUsername" className="font-weight-bold">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  placeholder="Nombre de Usuario"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword" className="font-weight-bold">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Contraseña"
                  autoComplete="on"
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
                <Link to="/" className="text-decoration-none">
                  <button className="btn btn-danger mt-2 btn-lg btn-block rounded-pill">
                    Cancelar
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
