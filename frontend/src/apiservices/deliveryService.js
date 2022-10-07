import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getDeliveries = async () => {
  const data = await axiosConfig
    .get(`/deliveries/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};


export const getDeliveryCount = async () => {
  const data = await axiosConfig
    .get(`/ordercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};


export const addDelivery = async (productData) => {
  const data = await axiosConfig
    .post(`/orders/`, productData)
    .then((response) => {
      console.log("Api Response")
      console.log(response)
      return response;
    })
    .catch((err) => {
      console.log("Api Error")
      console.log(err.response.data.result);
      return err.response;
    });

  return data;
};


const deliveryService = {
  getDeliveries
};




export default deliveryService;
