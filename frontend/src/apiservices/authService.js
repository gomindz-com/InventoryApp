import { baseUrl } from "./baseURL";
import axiosConfig from "./axios-configAuth";

export const loginUser = async (userData) => {
  console.log("Calling Login API Service");
  const data = await axiosConfig
    .post(`/user/login/`, userData)
    .then(async (response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return data;
};

export const registerUser = async (userData) => {
  const data = await axiosConfig
    .post(`/user/register`, userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return data;
};
