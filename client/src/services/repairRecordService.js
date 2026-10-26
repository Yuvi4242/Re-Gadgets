import api from '../api/axiosInstance';

export const createOrUpdateRepairRecord = async (recordData) => {
  const response = await api.post('/repair-records', recordData);
  return response.data;
};

export const updateRepairRecord = async (id, recordData) => {
  const response = await api.put(`/repair-records/${id}`, recordData);
  return response.data;
};

export const uploadRepairPhoto = async (id, { file, type, caption = '' }) => {
  const formData = new FormData();
  formData.append('photo', file);
  formData.append('type', type);
  if (caption) formData.append('caption', caption);

  const response = await api.post(`/repair-records/${id}/photos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getRepairRecord = async (id) => {
  const response = await api.get(`/repair-records/${id}`);
  return response.data.record;
};

export const getRepairRecordByBooking = async (bookingId) => {
  const response = await api.get(`/repair-records/booking/${bookingId}`);
  return response.data.record;
};

export const getDeviceRepairHistory = async (deviceIdentifier) => {
  const response = await api.get(`/repair-records/device/${encodeURIComponent(deviceIdentifier)}`);
  return response.data.history || [];
};

export const getCustomerRepairHistory = async () => {
  const response = await api.get('/repair-records/customer/history');
  return response.data.history || [];
};
