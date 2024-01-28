import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getInvoices = async () => {
  const data = await axiosConfig
    .get(`/invoices/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};


export const getInvoiceCount = async () => {
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


export const addInvoice = async (productData) => {
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


export const deleteInvoice = async (id) => {
  const data = await axiosConfig
    .delete(`/orders/${id}`)
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



export const editInvoice = async (id, data) => {
  const data1 = await axiosConfig
    .put(`/invoices/${id}`, data)
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

  return data1;
};

