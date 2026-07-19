import api from '../api/axiosInstance';

export const getCustomerOrders = async () => {
  const response = await api.get('/orders');
  const data = response.data;
  return Array.isArray(data) ? data : data.orders || [];
};

export const getOrderDetails = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}/status`, { status: 'Cancelled' });
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}/status`, { status });
  return response.data;
};

export const getAssignedOrders = async () => {
  const response = await api.get('/orders/assigned');
  return response.data.orders || [];
};

export const submitOrderReview = async (orderId, { rating, comment }) => {
  const response = await api.post(`/orders/${orderId}/reviews`, { rating, comment });
  return response.data;
};

export const updateOrderLocation = async (orderId, { lat, lng }) => {
  const response = await api.patch(`/orders/${orderId}/location`, { lat, lng });
  return response.data;
};
