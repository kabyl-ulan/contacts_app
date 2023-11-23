import axios from "axios";

export const API_ADDRESS = process.env.REACT_APP_BACK_API;

export const PUBLIC_API = axios.create({
  baseURL: API_ADDRESS,
});
