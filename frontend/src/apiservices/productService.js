import axiosConfig from "./axios-config";

export const getProducts = async () => {
  const data = await axiosConfig
    .get(`/products/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export const getProductCount = async () => {
  const data = await axiosConfig
    .get(`/productcount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });

  return data;
};

export const addProduct = async (productData) => {
  const data = await axiosConfig
    .post(`/products/`, productData)
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


export const deleteProduct = async (id) => {
  const data = await axiosConfig
    .delete(`/products/${id}`)
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

export const editProduct = async (productData) => {
  const data = await axiosConfig
    .put(`/products/${productData.id}`, productData)
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

const productService = {
  getProducts,
  getProductCount,
  addProduct,
  deleteProduct
};

export default productService;
