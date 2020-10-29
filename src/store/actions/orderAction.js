import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      customerSignIn: { customerInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "order/create",
      order,
      {
        headers: {
          Authorization: "Bearer " + customerInfo.token,
        },
      }
    );
    localStorage.setItem("order", JSON.stringify(newOrder));
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      customerSignIn: { customerInfo },
    } = getState();
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + "order",
      {
        headers: { Authorization: "Bearer " + customerInfo.token },
      }
    );
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const {
      customerSignIn: { customerInfo },
    } = getState();
    const { data } = axios.get(process.env.REACT_APP_SERVER_URL + "order", {
      headers: { Authorization: "Bearer " + customerInfo.token },
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const detailOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      customerSignIn: { customerInfo },
    } = getState();
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + "order/" + orderId,
      {
        headers: { Authorization: "Bearer " + customerInfo.token },
      }
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const {
      customerSignIn: { customerInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "invoice/create",
      paymentResult,
      {
        headers: { Authorization: "Bearer " + customerInfo.token },
      }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      customerSignIn: { customerInfo },
    } = getState();
    const { data } = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "order/" + orderId,
      {
        headers: { Authorization: "Bearer " + customerInfo.token },
      }
    );
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};

export {
  createOrder,
  getOrders,
  getMyOrders,
  detailOrder,
  payOrder,
  deleteOrder,
};
