import React from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Switch from "react-bootstrap/esm/Switch";

import Main from "./../pages/Main";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import ProductDetail from "../pages/ProductDetail";

function Home(props) {
  const category = props.match.params.id ? props.match.params.id : "";

  return (
    <div>
      <div className="row">
        <div className="col-md-3 bg-white border-right">
          <SideMenu />
        </div>
        <div className="col-md-9 vh-100 overflow-auto">
          <Switch>
            <Route
              exact
              path="/category/:id"
              render={(props) => <Main {...props} category={category} />}
            />
            <Route exact path="/" component={Main} />
            <Route exact path="product/:id" component={ProductDetail} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
