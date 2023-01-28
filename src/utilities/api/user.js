import axios from "axios";
const BASE_URL = "/users";

//User SignUp
export const signUp = async (data) => {
  return await axios.post(`${BASE_URL}`, data);
};

//User Login
export const login = async (data) => {
  return await axios.post(`${BASE_URL}/login`, data);
};

//Google OAuth SignUp&Login
export const googleSignIn = async (data) => {
  return await axios.post(`${BASE_URL}/googleSignIn`, data);
};
