import axios from "axios";

export const baseApiUrl = "https://4bc8-41-223-215-222.ngrok-free.app/api";

const axiosConfig = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
