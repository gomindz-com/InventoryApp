import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getOrders = async () => {
  const data = await axiosConfig
    .get(`/orders/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};

const orderService = {
  getOrders,
};

export default orderService;
