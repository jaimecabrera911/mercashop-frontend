import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="delete" disabled color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="add an alarm">
        <AlarmIcon />
      </IconButton>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
}

export function Pedidos() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="menu"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Pedidos"
        style={{ color: "#31A434" }}
      >
        <LibraryBooks fontSize="large" />
      </IconButton>
    </div>
  );
}

export function Login(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton
        aria-label="menu"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Login"
        style={{ color: "#2980b9" }}
        id="login"
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export function Location() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        type="button"
        aria-label="menu"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Ubicación"
        style={{ color: "#f1c40f" }}
      >
        <LocationOnIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
