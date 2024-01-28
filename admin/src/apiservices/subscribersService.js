import axiosConfig from "./axios-config";

export const getSubscribers = async () => {
  const data = await axiosConfig
    .get(`/users/subscribers`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};


export const toggleActivateSubscriber = async (id, is_active) => {
  const data = await axiosConfig
    .patch(`/users/update-subscriber/${id}`, {"is_active": !is_active})
    .then((response) => {
      console.log("Api Response")
      console.log(response)
      return response;
    })
    .catch((err) => {
      console.log("Api Error")
      console.log(err.response.data.result);
      return err.response;
    });

  return data;
}



const subscriberService = {
  getSubscribers,
  toggleActivateSubscriber
};

export default subscriberService;
