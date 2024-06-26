import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "./api";
import { baseApiUrl } from "./axios-config";

const axiosConfig = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem("token");
  config.headers.Authorization = token ? `Token ${token}` : "";
  return config;
});

export default axiosConfig;
