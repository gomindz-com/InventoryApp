import axiosConfig from "./axios-config";

export const getCategories = async (customerId) => {

  const data = await axiosConfig
    .get(`/store/categories/`)
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
    .post(`/store/categories/`, productData)
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
    .put(`/store/categories/${categorieId}/`, categorieData)
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
    .delete(`/store/categories/${id}/`)
    .then((response) => {
      
      
      return response;
    })
    .catch((err) => {
      
      console.log(err);
      return err;
    });

  return data;
};

const categoryService = {
  getCategories,
  addCategory,
  deleteCategory
};

export default categoryService;
