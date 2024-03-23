import axios from "axios";

const apis = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: 'http://10.0.2.2:8000/api/users',
  timeout: 30000,
});

export default apis;

export const baseUrl = "https://06f1-197-148-78-31.ngrok-free.app";
// export const baseUrl = "http://10.2.2.2:8000/api";
