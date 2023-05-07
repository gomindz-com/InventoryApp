import axios from "axios";
import { baseUrl } from "./baseURL";

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async function (config) {
  let token = localStorage.getItem("token");
  console.log(token ? token : "Empty Token");
  token ? config.headers.Authorization = `Token ${token}` : "";
  //config.headers.Authorization = token ? `Token ${token}` : "";
  return config;
});

export default axiosConfig;
