import axios from "axios";

export const baseUrl = "https://06f1-197-148-78-31.ngrok-free.app";

const apis = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/users',
  timeout: 30000,
});

export default apis;
