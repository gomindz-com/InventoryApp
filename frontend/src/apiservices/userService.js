import axiosConfig from "./axios-config";


export const getUserDetails = async (email) => {
  
  const data = await axiosConfig
    .get(`/user/userdetails/${email}/`)
    .then(async (response) => {
      
      return response;
    })
    .catch((error) => {
      return error;
    });

  return data;
};

