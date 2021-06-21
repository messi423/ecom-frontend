import axios from "axios";

const localhost = "http://127.0.0.1:8000";
const api = "/api";
export const endpoint = `${localhost}${api}`;

export const productList = `${endpoint}/article/`;
export const productDetail = (id) => `${endpoint}/article/${id}/`;
export const cartView = `${endpoint}/order/`;
export const addToCart = `${endpoint}/add-to-cart/`;
export const removeCart = (id) => `${endpoint}/remove-from-cart/${id}/`;
export const getAddresses = `${endpoint}/address/`;
export const deleteAddress = (id) => `${endpoint}/address/${id}/`;
export const postAddress = `${endpoint}/address/`;
export const updateAddress = (id) => `${endpoint}/address/${id}/`;
export const getProfile = `${endpoint}/profile/`;
export const editProfile = (id) => `${endpoint}/profile/${id}/`;
export const getUser = `${endpoint}/user/`;
export const paymentURL = `${endpoint}/payment/`;

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});
