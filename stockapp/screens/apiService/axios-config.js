import axios from "axios";

export const baseApiUrl = "https://d8c8-155-251-254-59.ngrok-free.app/api";

const axiosConfig = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosConfig;
