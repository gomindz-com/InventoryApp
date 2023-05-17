import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getOrders = async () => {
  const data = await axiosConfig
    .get(`/orders/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return(err);
      toast.error(err);
    });

  return data;
};


export const getOrderCount = async () => {
  const data = await axiosConfig
    .get(`/ordercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return(err);
      toast.error(err);
    });

  return data;
};


export const addOrder = async (productData) => {
  const data = await axiosConfig
    .post(`/orders/`, productData)
    .then((response) => {
      
      
      return response;
    })
    .catch((err) => {
      
        return err.response;
    });

  return data;
};


export const deleteOrder = async (id) => {
  const data = await axiosConfig
    .delete(`/orders/${id}`)
    .then((response) => {
      
      
      return response;
    })
    .catch((err) => {
      
        return err.response;
    });

  return data;
};


const orderService = {
  getOrders,
  addOrder,
  deleteOrder
};

export default orderService;
