import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class SideMenu extends React.Component {
  render() {
    return (
      <div className="vh-100 overflow-auto pr-0">
        <ButtonGroup className="btn-block" vertical>
          <h3 className="text-dark ml-4 mt-2">Categorías</h3>
          <Link to="/category/Lácteos-y-huevos">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854014/categories/lacteos_y_huevos_o59y3b.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Lacteos y Huevos"
              />
              Lácteos y huevos
            </Button>
          </Link>
          <Link to="/category/Abarrotes">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854008/categories/abarrotes_idjb1r.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Abarrotes"
              />
              Abarrotes
            </Button>
          </Link>
          <Link to="/category/Panadería-y-Arepas">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854014/categories/panader%C3%ADa_a80cma.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Panadería y Arepas"
              />
              Panadería y Arepas
            </Button>
          </Link>
          <Link to="/category/Café,-Chocolate-y-Té">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854008/categories/caf%C3%A9_tr8hmz.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Café, Chocolate y Té"
              />
              Café, Chocolate y Té
            </Button>
          </Link>
          <Link to="/category/Galletas-y-Antojos">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854012/categories/galletas_dx94t5.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Galletas y Antojos"
              />
              Galletas y Antojos
            </Button>
          </Link>
          <Link to="/category/Pollo,-Carne-y-Pescado">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854009/categories/carne_y_pollo_hkqgsi.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Pollo, Carne y Pescado"
              />
              Pollo, Carne y Pescado
            </Button>
          </Link>
          <Link to="/category/Carnes-frías-y-Embutidos">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854010/categories/carnes_fr%C3%ADas_y_embutidos_oal7rd.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Carnes frías y Embutidos"
              />
              Carnes frías y Embutidos
            </Button>
          </Link>
          <Link to="/category/Frutas-y-Verduras">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854014/categories/frutas_y_verduras_ddfsmr.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Frutas y Verduras"
              />
              Frutas y Verduras
            </Button>
          </Link>
          <Link to="/category/Licores">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854014/categories/licores_d0dlt0.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Licores"
              />
              Licores
            </Button>
          </Link>
          <Link to="/category/Bebidas">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854010/categories/bebidas_vookrj.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Bebidas"
              />
              Bebidas
            </Button>
          </Link>
          <Link to="/category/Mascotas">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854014/categories/mascotas_udx9qk.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Mascotas"
              />
              Mascotas
            </Button>
          </Link>
          <Link to="/category/Aseo-del-hogar">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854011/categories/aseo_hogar_g7x2zj.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Aseo del hogar"
              />
              Aseo del hogar
            </Button>
          </Link>
          <Link to="/category/Cuidado-de-la-Ropa">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854010/categories/cuidado_de_la_ropa_rdkwk9.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Cuidado de la Ropa"
              />
              Cuidado de la Ropa
            </Button>
          </Link>
          <Link to="/category/Cuidado-personal">
            <Button variant="white" className="btn-sm text-left">
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601854008/categories/aseo_personal_rmtcew.png"
                width="40"
                height="40"
                className="mr-2"
                alt="Cuidado Personal"
              />
              Cuidado personal
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    );
  }
}

export default withRouter(SideMenu);
