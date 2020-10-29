import {
  PROVIDER_SIGNIN_REQUEST,
  PROVIDER_SIGNIN_SUCCESS,
  PROVIDER_SIGNIN_FAIL,
  PROVIDER_REGISTER_REQUEST,
  PROVIDER_REGISTER_SUCCESS,
  PROVIDER_REGISTER_FAIL,
  PROVIDER_LOGOUT,
  PROVIDER_UPDATE_REQUEST,
  PROVIDER_UPDATE_SUCCESS,
  PROVIDER_UPDATE_FAIL,
} from "../constants/providerConstants";

function providerSignInReducer(state = {}, action) {
  switch (action.type) {
    case PROVIDER_SIGNIN_REQUEST:
      return { loading: true };
    case PROVIDER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case PROVIDER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case PROVIDER_LOGOUT:
      return {};
    default:
      return state;
  }
}
function providerUpdateReducer(state = {}, action) {
  switch (action.type) {
    case PROVIDER_UPDATE_REQUEST:
      return { loading: true };
    case PROVIDER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case PROVIDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function providerRegisterReducer(state = {}, action) {
  switch (action.type) {
    case PROVIDER_REGISTER_REQUEST:
      return { loading: true };
    case PROVIDER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case PROVIDER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { providerRegisterReducer, providerSignInReducer, providerUpdateReducer };
