import axios, { AxiosInstance } from "axios";

const api_url = process.env.REACT_APP_BACKEND_URL;

export const API: AxiosInstance = axios.create({
   baseURL: api_url,
   headers: { "Content-Type": "application/json" },
});
