import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/products"
    : "/api/products";

const authService = axios.create({
  baseURL,
  withCredentials: true,
});

export const getAllProductsFn = () => authService.get();
export const getAProductFn = (productID) => authService.get(`/${productID}`);

export const createProductFn = (newProduct) =>
  authService.post("/create", newProduct);

export const editProductFn = (productUpdated) =>
  authService.put(`/${productID}`, productUpdated);

export const deleteProductFn = (productID) =>
  authService.delete(`/${productID}`);
