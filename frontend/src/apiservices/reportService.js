import axiosConfig from "./axios-config";

export const getRport = async (type) => {
  const data = await axiosConfig
    .get(`/store/report`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return data;
};
