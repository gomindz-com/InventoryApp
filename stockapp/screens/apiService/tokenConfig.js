import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "./api";

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem("token");
  console.log("User Token");
  console.log(token);
  config.headers.Authorization = token ? `Token ${token}` : "";
  return config;
});

export default axiosConfig;
