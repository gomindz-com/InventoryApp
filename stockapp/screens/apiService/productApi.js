import apis from "./api";
const endPoint = "/mobile/mobileProducts";
import axiosConfig from "./tokenConfig";

export const addProduct = async (productData) => {
  const data = await axiosConfig
    .post(`/mobile/mobileProducts`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const getAddProduct = async (productData) => {
  const data = await axiosConfig
    .get(`/mobile/mobileProducts`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const getStatictData = async (productData) => {
  const data = await axiosConfig
    .get(`/mobile/stats`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};
