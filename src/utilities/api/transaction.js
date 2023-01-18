import axios from "axios";
const BASE_URL = "/transactions";

export async function createTransaction(data) {
  return axios.post(`${BASE_URL}/create`, data);
}

export async function getTransactions(data) {
  return axios.post(`${BASE_URL}/`, data);
}
