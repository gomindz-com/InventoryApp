import axiosConfig from "./axios-config";

export const getCategories = async () => {

  const data = await axiosConfig
    .get(`/store/categories`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const addCategory = async (categoryData) => {
  const data = await axiosConfig
    .post(`/store/categories`, categoryData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      
      return err.response;
    });

  return data;
};


export const editCategoriee = async (categorieId, categorieData) => {
  const data = await axiosConfig
    .put(`/store/categories/${categorieId}`, categorieData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};



export const deleteCategory= async (id) => {
  const data = await axiosConfig
    .delete(`/store/categories/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

