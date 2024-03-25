import axios from "axios";

const apis = axios.create({
  baseURL: "http://10.0.2.2:8000/api/users",
  timeout: 30000,
});

export default apis;
