import axiosConfig from "./axios-config";

export const getDamages = async () => {

  const data = await axiosConfig
    .get(`/store/damages`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const addDamage = async (data) => {
  const res = await axiosConfig
    .post(`/store/damages`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
};


