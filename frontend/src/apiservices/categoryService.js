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
};


export const editCategoriee = async (categorieId, categorieData) => {
  const data = await axiosConfig
    .put(`/categories/${categorieId}`, categorieData)
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
};



export const deleteCategory= async (id) => {
  const data = await axiosConfig
    .delete(`/categories/${id}`)
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
};

const categoryService = {
  getCategories,
  addCategory,
  deleteCategory
};

export default categoryService;
