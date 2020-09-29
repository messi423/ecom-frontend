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

export const fetchCart = () => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .get(cartView)
      .then((res) => {
        const order = res.data;
        dispatch(cartSuccess(order));
      })
      .catch((error) => {
        dispatch(cartFail(error));
      });
  };
};
