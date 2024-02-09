import axiosConfig from "./axios-config";

export const loginUser = async (userData) => {
  const data = await axiosConfig
    .post(`/users/login-admin`, userData)
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
    .post(`/user/register-admin`, userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return data;
};


export const resetSubscriberPassword = async (email) => {
  const data = await axiosConfig
    .put(`/users/reset-user-password`, {
      'email' : email,
      'password' : 'password@123'
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return data;
};