import axiosConfig from "./axios-config";

export const loginUser = async (userData) => {
  const data = await axiosConfig
    .post(`/users/login-admin`, userData)
    .then(async (response) => {
      return response;
    })
    .catch((error) => {
      console.log(error)

      return error;
    });

  return data;
};

export const registerUser = async (userData) => {
  const data = await axiosConfig
    .post(`/user/register-admin`, userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return data;
};
