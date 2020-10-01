import axios from "axios";
import * as at from "../actions/actionTypes";
import { authAxios, cartView } from "../../utils";

export const cartStart = () => {
  return {
    type: at.CART_START,
  };
};

export const cartSuccess = (order) => {
  return {
    type: at.CART_SUCCESS,
    order: order,
  };
};

export const cartFail = (error) => {
  return {
    type: at.CART_FAIL,
    error: error,
  };
};

// export const fetchCart = () => {
//   console.log("thsjabsjh");
//   const order = {};
//   return authAxios.get(cartView);
// };
export const fetchCart = () => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .get(cartView)
      .then((res) => {
        dispatch(cartSuccess(res.data));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};
