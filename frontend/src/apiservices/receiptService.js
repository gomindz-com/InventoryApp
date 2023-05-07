import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getReceipts = async () => {
  const data = await axiosConfig
    .get(`/store/receipts/`) 
    .then((response) => {
      return response;
    })
    .catch((err) => {
      toast.error(err);
    });

  return data;
};


export const getReceiptCount = async () => {
  const data = await axiosConfig
    .get(`/store/ordercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      toast.error(err);
    });

  return data;
};


export const addReceipt = async (productData) => {
  const data = await axiosConfig
    .post(`/store/receipts/`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
     
      return err.response;
    });

  return data;
};


export const deleteReceipt = async (id) => {
  const data = await axiosConfig
    .delete(`/store/receipts/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};



