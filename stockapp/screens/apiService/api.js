import axios from "axios";

const apis = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users",
  timeout: 30000,
});

export default apis;
