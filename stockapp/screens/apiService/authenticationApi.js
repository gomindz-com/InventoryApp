import axiosConfig from "./axios-config";

export const loginUser = async (userData) => {
  const data = await axiosConfig
    .post(`/users/login`, userData)
    .then(async (response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
};

export const registerUser = async (userData) => {
  const data = await axiosConfig
    .post(`/users/register`, userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return data;
};

export const userDetails = async (userData) => {
  const data = await axiosConfig
    .get(`/users/details`, userData)
    .then((response) => {
      return response;
    })

    .catch((error) => {
      return error.response;
    });

  return data;
};
