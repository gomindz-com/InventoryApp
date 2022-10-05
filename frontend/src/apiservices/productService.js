import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getProducts = async () => {
  const data = await axiosConfig
    .get(`/products/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};

const productService = {
  getProducts,
};

export default productService;
