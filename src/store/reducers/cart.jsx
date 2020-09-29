import { updateObject } from "../utility";
import * as at from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  order: null,
};

const cartStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const cartSuccess = (state, action) => {
  return updateObject(state, { loading: false, order: action.order });
};

const cartFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case at.CART_SUCCESS:
      return cartSuccess(state, action);
    case at.CART_START:
      return cartStart(state, action);
    case at.CART_FAIL:
      return cartFail(state, action);
    default:
      return state;
  }
};

export default cartReducer;
