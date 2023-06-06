import axiosConfig from "./axios-config";

export const getOrders = async (type) => {
  const data = await axiosConfig
    .get(`/store/orders?type=${type}`) 
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return data;
};


export const getOrderCount = async () => {
  const data = await axiosConfig
    .get(`/store/ordercount/`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};


export const addOrder = async (type, productData) => {
  const data = await axiosConfig
    .post(`/store/orders?type=${type}`, productData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return data;
};


export const editOrder = async (id, updateData) => {

  const data = await axiosConfig
    .patch(`/store/orders/${id}`, updateData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return data;
};


export const updateOrder = async (id, updateData) => {

  const data = await axiosConfig
    .put(`/store/orders/${id}`, updateData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return data;
};


export const editInvoice = async (id, updateData) => {

  const data = await axiosConfig
    .patch(`/store/orders/${id}`, updateData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return data;
};


export const deleteOrder = async (id) => {
  const data = await axiosConfig
    .delete(`/store/orders/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  return data;
};

