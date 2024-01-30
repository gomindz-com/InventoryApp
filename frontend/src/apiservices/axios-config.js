import axios from "axios";

const baseApiUrl = process.env.REACT_APP_BASE_API_URL;

const axiosConfig = axios.create({
  baseURL: baseApiUrl,
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
