import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Carrito(props) {
  const cart = useSelector((state) => state.cart);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const numProducts = cart.cartItems.length;

  const handleClose = () => {
    setOpen(false);
  };

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <div>
      <Link to="/cart">
        <IconButton
          type="button"
          aria-label="cart"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Carrito Compras"
          style={{ color: "#e74c3c" }}
        >
          <StyledBadge badgeContent={numProducts} color="secondary">
            <ShoppingCartIcon fontSize="large"/>
          </StyledBadge>
        </IconButton>
      </Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Carrito de Compras</h2>
            <div id="transition-modal-description">
              <div class="card" style={{ width: "18rem" }}>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
