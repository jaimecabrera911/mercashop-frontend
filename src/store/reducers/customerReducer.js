import {
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_LOGOUT,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_VERIFIED_REQUEST,
  CUSTOMER_VERIFIED_SUCCESS,
  CUSTOMER_VERIFIED_FAIL,
} from "../constants/customerConstants";

function customerSignInReducer(state = {}, action) {
  switch (action.type) {
    case CUSTOMER_SIGNIN_REQUEST:
      return { loading: true };
    case CUSTOMER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CUSTOMER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
}
function customerUpdateReducer(state = {}, action) {
  switch (action.type) {
    case CUSTOMER_UPDATE_REQUEST:
      return { loading: true };
    case CUSTOMER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CUSTOMER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function customerRegisterReducer(state = {}, action) {
  switch (action.type) {
    case CUSTOMER_REGISTER_REQUEST:
      return { loading: true };
    case CUSTOMER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CUSTOMER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function customerVerifyReducer(state = {}, action) {
  switch (action.type) {
    case CUSTOMER_VERIFIED_REQUEST:
      return { loading: true };
    case CUSTOMER_VERIFIED_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CUSTOMER_VERIFIED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  customerRegisterReducer,
  customerSignInReducer,
  customerUpdateReducer,
  customerVerifyReducer,
};
