import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getBuyers = async () => {
  const data = await axiosConfig
    .get(`/api/buyers/`)
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
    .put(`/api/buyers/${buyerId}`, buyerData)
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
    .post(`/api/buyers/`, buyerData)
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

const buyerService = {
  getBuyers,
  addBuyer,
  deleteBuyer
};

export default buyerService;
