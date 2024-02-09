import axiosConfig from "./axios-config";


export const getUserDetails = async () => {
  
  const data = await axiosConfig
    .get(`/users/details`)
    .then(async (response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
};


export const updateSubscriberDetails = async (userData) => {
  const data = await axiosConfig
    .patch(`/users/update`, userData)
    .then(async (response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
};


const subscriberService = {
  getUserDetails,
  updateSubscriberDetails
};

export default subscriberService;
