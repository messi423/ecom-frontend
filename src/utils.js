import axios from "axios";

const localhost = "http://127.0.0.1:8000";
const api = "/api";
export const endpoint = `${localhost}${api}`;

export const productList = `${endpoint}/article/`;
export const productDetail = (id) => `${endpoint}/article/${id}/`;
export const cartView = `${endpoint}/order/`;
export const addToCart = `${endpoint}/add-to-cart/`;
export const removeCart = (id) => `${endpoint}/remove-from-cart/${id}/`;

export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});
