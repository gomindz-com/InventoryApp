import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getBuyers = async () => {
  const data = await axiosConfig
    .get(`/buyers/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};

const buyerService = {
  getBuyers,
};

export default buyerService;
