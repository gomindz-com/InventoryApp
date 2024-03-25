import axios from "axios";

export const baseApiUrl = "https://53fb-41-223-215-146.ngrok-free.app/api";

const axiosConfig = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosConfig;
