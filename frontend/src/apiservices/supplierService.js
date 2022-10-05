import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getSuppliers = async () => {
  const data = await axiosConfig
    .get(`/suppliers/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};

const supplierService = {
  getSuppliers,
};

export default supplierService;
