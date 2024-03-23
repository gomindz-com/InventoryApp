import axios from "axios";

const baseApiUrl = 'https://8df3-197-255-192-3.ngrok-free.app/api';

const axiosConfig = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosConfig;
