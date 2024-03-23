import apis from "./api";
const endPoint = "/users";

const login = (userData) => apis.post(`${endPoint}/login`, userData);

const regiterUser = (userData) => apis.post(`${endPoint}/register`, userData);

const authApi = {
  login,
  regiterUser,
};

export default authApi;
