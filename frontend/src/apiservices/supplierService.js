import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getSuppliers = async () => {
  const data = await axiosConfig
    .get(`/api/suppliers/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      toast.error(err);
    });

  return data;
};


export const getSupplierCount = async () => {
  const data = await axiosConfig
    .get(`/store/suppliercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      toast.error(err);
    });

  return data;
};




export const addSupplier = async (supplierData) => {
  const data = await axiosConfig
    .post(`/api/suppliers/`, supplierData)
    .then((response) => {
      
      return response;
    })
    .catch((err) => {
      
      return err.response;
    });

  return data;
};


export const editSupplier = async (supplierId, supplierData) => {
  const data = await axiosConfig
    .put(`/api/suppliers/${supplierId}`, supplierData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};


export const deleteSupplier = async (supplierId) => {
  const data = await axiosConfig
    .delete(`/api/suppliers/${supplierId}`)
    .then((response) => {
      
      return response;
    })
    .catch((err) => {
      
      return err.response;
    });

  return data;
};


const supplierService = {
  getSuppliers,
  addSupplier,
  getSupplierCount,
  deleteSupplier
};

export default supplierService;
