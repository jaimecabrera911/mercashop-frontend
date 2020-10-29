import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/login";
import LoginProvider from "./pages/loginProvider";
import RegisterCostumer from "./pages/RegisterCostumer";
import RegisterProvider from "./pages/RegisterProvider";
import Home from "./shared/Home";
import Switch from "react-bootstrap/esm/Switch";
import Cart from "./pages/Cart";
import Header from "./shared/Header";
import Profile from "./pages/Profile";
import ActivarCuenta from "./pages/ActivarCuenta";
import ProfileProvider from "./pages/ProfileProvider";
import PlaceOrder from "./pages/PlaceOrder";
import Response from './pages/Response';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login-proveedor" component={LoginProvider} />
        <Route exact path="/registro-cliente" component={RegisterCostumer} />
        <Route exact path="/registro-proveedor" component={RegisterProvider} />
        <Route exact path="/cart/:id?" component={Cart} />
        <Route exact path="/category/:id" component={Home} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/profile-provider/:id" component={ProfileProvider} />
        <Route exact path="/place-order" component={PlaceOrder} />
        <Route exact path="/response" component={Response} />
        <Route exact path="/activar-cuenta/:id" component={ActivarCuenta}/>
        <Route exact path="/product/:id" component={ProductDetail}/>
      </Switch>
    </Router>
  );
}

export default App;
