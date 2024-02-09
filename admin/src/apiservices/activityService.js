import { toast } from "react-toastify";
import axiosConfig from "./axios-config";

export const getUserActivities = async () => {
  const data = await axiosConfig
    .get(`/users/user-activity`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};



export const getStoreActivities = async () => {
  const data = await axiosConfig
    .get(`/store/store-activity`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};




const activityService = {
  getUserActivities,
  getStoreActivities
};

export default activityService;
