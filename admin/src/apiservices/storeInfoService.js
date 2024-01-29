import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getStoreInfo = async () => {
  const data = await axiosConfig
    .get(`/store/store-info`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};






const storeInfoService = {
  getStoreInfo
};

export default storeInfoService;
