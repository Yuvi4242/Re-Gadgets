import api from '../api/axiosInstance';

export const getOwnerStats = async () => {
  const response = await api.get('/shops/owner/stats');
  return { ...response.data.stats, shopId: response.data.shopId, shopName: response.data.shopName };
};

export const getOwnerOrders = async (params = {}) => {
  const response = await api.get('/shops/owner/orders', { params });
  return response.data;
};

export const getShopWorkers = async (shopId) => {
  const response = await api.get(`/shops/${shopId}/workers`);
  return Array.isArray(response.data) ? response.data : response.data.workers || [];
};

export const createShopWorker = async (shopId, payload) => {
  const response = await api.post(`/shops/${shopId}/workers`, payload);
  return response.data;
};

export const getShopReviews = async (shopId, params = {}) => {
  const response = await api.get(`/shops/${shopId}/reviews`, { params });
  return response.data;
};

export const getShopInventory = async (shopId, params = {}) => {
  const response = await api.get(`/shops/${shopId}/inventory`, { params });
  return response.data.items || [];
};

export const createInventoryItem = async (shopId, payload) => {
  const response = await api.post(`/shops/${shopId}/inventory`, payload);
  return response.data;
};

export const updateInventoryItem = async (shopId, itemId, payload) => {
  const response = await api.patch(`/shops/${shopId}/inventory/${itemId}`, payload);
  return response.data;
};

export const deleteInventoryItem = async (shopId, itemId) => {
  const response = await api.delete(`/shops/${shopId}/inventory/${itemId}`);
  return response.data;
};

export const getShopById = async (shopId) => {
  const response = await api.get(`/shops/${shopId}`);
  return response.data.shop;
};
