import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/products"
    : "/api/products";

const productService = axios.create({
  baseURL,
  withCredentials: true,
});

export const getAllProductsFn = () => productService.get("/");

export const getAvailableProductsFn = () => productService.get("/available");

export const getAProductFn = (productID) => productService.get(`/${productID}`);

export const createProductFn = (newProduct) =>
  productService.post("/create", newProduct);

export const editProductFn = (productID, productUpdated) =>
  productService.put(`/${productID}`, productUpdated);

export const deleteProductFn = (productID) =>
  productService.delete(`/${productID}`);

export const searchProductsFn = (searchString) =>
  productService.post("/search", searchString);
