import axios from "axios";
const BASE_URL = "/inventories";

export async function search(data) {
  return axios.post(`${BASE_URL}/search-sneaker`, data);
}

export async function add(data) {
  return axios.post(`${BASE_URL}/add`, data);
}

export async function getAll(data) {
  return axios.post(`${BASE_URL}/`, data);
}

export async function update(data) {
  return axios.post(`${BASE_URL}/update`, data);
}

export async function deleteAll(id) {
  return axios.delete(`${BASE_URL}/${id}/delete`);
}

export async function deleteOne(id, data) {
  return axios.post(`${BASE_URL}/${id}/delete-size`, data);
}

export async function sold(id, data) {
  return axios.post(`${BASE_URL}/${id}/sold-size`, data);
}
