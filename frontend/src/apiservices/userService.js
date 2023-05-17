import axiosConfig from "./axios-config";


export const getUserDetails = async (email) => {
  
  const data = await axiosConfig
    .get(`/customer/details`)
    .then(async (response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
};

