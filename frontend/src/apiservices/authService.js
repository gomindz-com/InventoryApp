import { baseUrl } from "./baseURL";
import axios from "./axios-config";

export const loginAdmin = async (userData) => {
  console.log("Calling Login API Service");
  const data = await axios
    .post(`${baseUrl}/api_only/admin_auth/login`, userData)
    .then(async (response) => {
      if (response.data.success) {
        return response.data;
      }
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return data;
};

export const registerAdmin = async (userData) => {
  const data = await axios
    .post(`${baseUrl}/admin_auth/register`, userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return data;
};
