import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // No ha sido utilizado/
import logo from "./../assets/images/Merca Shop letters inline.png";
import logoWhite from "../assets/images/Merca Shop letters inline white.png";
import { Link, useLocation, useHistory } from "react-router-dom";
import Carrito from "../components/Carrito";
import { Pedidos, Location } from "../shared/Buttons";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, MenuItem } from "@material-ui/core";
import { logout as logoutCustomer } from "../store/actions/customerAction";
import { logout as logoutProvider } from "../store/actions/providerAction";
import { AccountCircle, AccountBox } from "@material-ui/icons";
import SearchBox from "../components/SearchBox";

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const customerSignIn = useSelector((state) => state.customerSignIn);
  const { customerInfo } = customerSignIn;
  const providerSignIn = useSelector((state) => state.providerSignIn);
  const { providerInfo } = providerSignIn;
  const dispatch = useDispatch();
  const [path, setPath] = useState(window.location.pathname);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    setPath(location.pathname);
    setAnchorEl(false);
  }, [location, customerInfo, providerInfo]);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    history.push("/");
    customerInfo ? dispatch(logoutCustomer()) : dispatch(logoutProvider());
  };

  const currentPath = (path) => {
    if (
      path === "/login" ||
      path === "/login-proveedor" ||
      path === "/registro-cliente" ||
      path === "/registro-proveedor"
    ) {
      return true;
    }
    return false;
  };

  const classes = useStyles();

  const { names } = customerInfo ? customerInfo : "";
  return (
    <div className="App">
      {currentPath(path) ? (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom p-1">
          <Link className="navbar-brand ml-4" to="/">
            <img src={logoWhite} alt="logo" width="150" />
          </Link>
          <div className="row container">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div
                className="collapse navbar-collapse d-flex justify-content-end"
                id="navbarNav"
              ></div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom p-1">
          <Link className="navbar-brand ml-4" to="/">
            <img src={logo} alt="logo" width="150" />
          </Link>
          <div className="row container">
            <div className="col-md-6">
              <SearchBox />
            </div>
            <div className="col-md-6">
              <div
                className="collapse navbar-collapse d-flex justify-content-end"
                id="navbarNav"
              >
                <Link className="navbar-link" to="/">
                  <Location />
                </Link>
                <Pedidos />
                <Carrito />
                <div className={classes.root}>
                  <IconButton
                    aria-label="menu"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={names}
                    style={{ color: "#2980b9" }}
                    id="login"
                    onClick={handleClick}
                  >
                    <AccountCircleIcon fontSize="large" />
                  </IconButton>
                  {customerInfo || providerInfo ? (
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {customerInfo ? (
                        <MenuItem>
                          <span>{names}</span>
                        </MenuItem>
                      ) : (
                        <MenuItem>
                          <span>{providerInfo.names}</span>
                        </MenuItem>
                      )}
                      <MenuItem>
                        {customerInfo ? (
                          <Link
                            to={"/profile/" + customerInfo._id}
                            className="text-decoration-none text-dark"
                          >
                            Profile
                          </Link>
                        ) : (
                          <Link
                            to={"/profile-provider/" + providerInfo._id}
                            className="text-decoration-none text-dark"
                          >
                            Profile
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                  ) : (
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem>
                        <Link
                          to="/login"
                          className="text-decoration-none text-dark"
                        >
                          <AccountCircle className="mr-2" />
                          Cliente
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/login-proveedor"
                          className="text-decoration-none text-dark"
                        >
                          <AccountBox className="mr-2" />
                          Proveedor
                        </Link>
                      </MenuItem>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
