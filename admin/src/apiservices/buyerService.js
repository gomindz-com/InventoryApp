import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getBuyers = async () => {
  const data = await axiosConfig
    .get(`/buyers/`)
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
    .put(`/buyers/${buyerId}`, buyerData)
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
    .get(`/buyercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
    return(err);
    });

  return data;
};


export const addBuyer = async (buyerData) => {
  const data = await axiosConfig
    .post(`/buyers/`, buyerData)
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
    .delete(`/buyers/${id}`)
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
