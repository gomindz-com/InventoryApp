import axiosConfig from "./axios-config";

export const getCategories = async () => {
  const data = await axiosConfig
    .get(`/categories/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export const addCategory = async (productData) => {
  const data = await axiosConfig
    .post(`/categories/`, productData)
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
    .put(`/categories/${categorieId}`, categorieData)
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
    .delete(`/categories/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

const categoryService = {
  getCategories,
  addCategory,
  deleteCategory
};

export default categoryService;
