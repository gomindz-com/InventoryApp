import axiosConfig from "./tokenConfig";
export const AddTransaction = async (productData) => {
  const data = await axiosConfig
    .post(`/mobile/transactions`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const getTransactiondata = async (productData) => {
  const data = await axiosConfig
    .get(`/mobile/transactions`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};
