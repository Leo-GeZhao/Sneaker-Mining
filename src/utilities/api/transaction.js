import axios from "axios";
const BASE_URL = "/transactions";

//Create a Transaction
export const createTransaction = async (data) => {
  return await axios.post(`${BASE_URL}/create`, data);
};

//Get All Sold Transactions
export const getTransactions = async (data) => {
  return await axios.post(`${BASE_URL}/`, data);
};
