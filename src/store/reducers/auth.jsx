import { updateObject } from "../utility";
import * as at from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  token: null,
};

const authStart = (action, state) => {
  return updateObject(state, {
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case at.AUTH_SUCCESS:
      return authSuccess(state, action);
    case at.AUTH_START:
      return authStart(state, action);
    case at.AUTH_FAIL:
      return authFail(state, action);
    case at.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;
