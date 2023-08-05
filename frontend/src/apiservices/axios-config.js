import axios from "axios";
import { baseUrl } from "./baseURL";

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async function (config) {
  const token = localStorage.getItem('token');
  if(token){
      config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axiosConfig;
