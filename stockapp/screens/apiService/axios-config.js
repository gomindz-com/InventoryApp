import axios from "axios";

export const baseApiUrl = "https://6627-197-255-192-17.ngrok-free.app/api";


const axiosConfig = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosConfig;
