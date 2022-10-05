import axios from "axios";
import { baseUrl } from "./baseURL";

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  },
});

axiosConfig.interceptors.request.use(async function (config) {
  let token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosConfig;
