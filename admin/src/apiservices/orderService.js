import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getOrders = async (type) => {
  const data = await axiosConfig
    .get(`/store/admin-orders?type=${type}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};



export const deleteOrder = async (id) => {
  const data = await axiosConfig
    .delete(`/store/admin-orders/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};


const receiptService = {
  getOrders,
  deleteOrder
};

export default receiptService;
