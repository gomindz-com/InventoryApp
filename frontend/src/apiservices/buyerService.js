import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getBuyers = async () => {
  const data = await axiosConfig
    .get(`/store/buyers`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return(err);
    });

  return data;
};


export const editBuyer = async (buyerId, buyerData) => {
  const data = await axiosConfig
    .put(`/store/buyers/${buyerId}`, buyerData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      
      return err.response;
    });

  return data;
};




export const getBuyerCount = async () => {
  const data = await axiosConfig
    .get(`/store/buyercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return(err);
      toast.error(err);
    });

  return data;
};


export const addBuyer = async (buyerData) => {
  const data = await axiosConfig
    .post(`/store/buyers`, buyerData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      
      return err.response;
    });

  return data;
};


export const deleteBuyer = async (id) => {
  const data = await axiosConfig
    .delete(`/api/buyers/${id}`)
    .then((response) => {
  
      return response;
    })
    .catch((err) => {
      
      return err.response;
    });

  return data;
};



export const getBuyersInvoices = async (type, name) => {
  const data = await axiosConfig
    .get(`/store/buyers-invoices?type=${type}&buyer=${name}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return(err);
    });

  return data;
};



const buyerService = {
  getBuyers,
  addBuyer,
  deleteBuyer,
  getBuyersInvoices
};

export default buyerService;
