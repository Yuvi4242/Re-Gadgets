import api from '../api/axiosInstance';

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data.stats;
};

export const getAdminUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

export const updateAdminUser = async (userId, payload) => {
  const response = await api.patch(`/admin/users/${userId}`, payload);
  return response.data;
};
