import axiosConfig from "./axios-config";

export const getProducts = async () => {
  const data = await axiosConfig
    .get(`/store/products`)
    .then((response) => {
      return response;
    })
    .catch((err) => { 
      return err.response
    });

  return data;
};

export const getProductCount = async () => {
  const data = await axiosConfig
    .get(`/store/productcount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const addProduct = async (productData) => {
  const data = await axiosConfig
    .post(`/store/products`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};


export const deleteProduct = async (id) => {
  const data = await axiosConfig
    .delete(`/store/products/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

export const editProduct = async (productData) => {
  const data = await axiosConfig
    .put(`/store/products/${productData.id}`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
}


export const getProductsImages = async () => {
  const data = await axiosConfig
    .get(`/store/products-images`)
    .then((response) => {
      return response;
    })
    .catch((err) => { 
      return err.response
    });

  return data;
};