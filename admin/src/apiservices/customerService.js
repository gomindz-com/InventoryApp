import axiosConfig from "./axios-config";

export const getCustomers = async () => {
  const data = await axiosConfig
    .get(`/customers/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};


const customerService = {
  getCustomers,
};

export default customerService;
