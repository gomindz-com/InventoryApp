import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getDeliveries = async () => {
  const data = await axiosConfig
    .get(`/deliveries/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};

const deliveryService = {
  getDeliveries,
};

export default deliveryService;
