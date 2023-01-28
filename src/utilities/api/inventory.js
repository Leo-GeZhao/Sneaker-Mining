import axios from "axios";
const BASE_URL = "/inventories";

//Search Inventory from StockXAPI
export const search = (data) => {
  return axios.post(`${BASE_URL}/search-sneaker`, data);
};

//Add a Inventory
export const add = (data) => {
  return axios.post(`${BASE_URL}/add`, data);
};

//Get All Inventory
export const getAll = async (data) => {
  return await axios.post(`${BASE_URL}/`, data);
};

//Update a Inventory Detail from StockXAPI
export const update = async (data) => {
  return await axios.post(`${BASE_URL}/update`, data);
};

//Delete All Size from Single Inventory
export const deleteAll = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}/delete`);
};

//Delete a Single Size from Single Inventory
export const deleteOne = async (id, data) => {
  return await axios.post(`${BASE_URL}/${id}/delete-size`, data);
};

//Sold a Inventory
export const sold = async (id, data) => {
  return await axios.post(`${BASE_URL}/${id}/sold-size`, data);
};
