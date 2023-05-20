import axiosConfig from "./axios-config";

export const getStoreStatistics = async (customerId) => {
  const data = await axiosConfig
    .get(`store/storestatistics`) 
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return(err.response);
    });

  return data;
};
