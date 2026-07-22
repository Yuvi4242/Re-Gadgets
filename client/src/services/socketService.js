import { io } from 'socket.io-client';
import api from '../api/axiosInstance';
import useAuthStore from '../store/authStore';

let socket = null;

/**
 * Returns or initialises the Socket.IO client instance.
 * Automatically injects the JWT token stored in authStore for secure handshake.
 */
export const getSocket = () => {
  if (socket) return socket;

  const serverUrl = import.meta.env.VITE_SOCKET_URL || 'https://re-gadgets-backend.vercel.app';
  const token = useAuthStore.getState().accessToken;

  socket = io(serverUrl, {
    auth: { token },
    transports: ['websocket'],
    autoConnect: false
  });

  socket.on('connect_error', (err) => {
    console.error('[Socket Service] Connection error:', err.message);
  });

  return socket;
};

/**
 * Connects the socket if not already connected.
 */
export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
};

/**
 * Disconnects and cleans up the current socket connection.
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Subscribes to the specific order room to start receiving real-time tracking updates.
 * @param {string} orderId 
 */
export const joinOrderRoom = (orderId) => {
  connectSocket();
  const s = getSocket();
  s.emit('joinOrder', { orderId });
  console.log(`[Socket Service] Emitted joinOrder room request for: ${orderId}`);
};

/**
 * Attaches a callback listener for status updates on the active order.
 * @param {function} callback 
 */
export const onStatusUpdate = (callback) => {
  const s = getSocket();
  s.off('order:statusUpdate'); // Avoid stacking duplicate listeners
  s.on('order:statusUpdate', (data) => {
    console.log('[Socket Service] Live order status update received:', data);
    callback(data);
  });
};

/**
 * Graceful Fallback Polling Engine
 * If WebSocket fails to connect or disconnects unexpectedly,
 * client components (such as Tracking.jsx) call this to poll the order details via REST.
 * 
 * @param {string} orderId 
 * @param {function} callback - Receives the fresh Order object from REST response
 * @returns {number} Interval ID to clear on unmount
 */
export const startPollingOrder = (orderId, callback) => {
  console.log(`[Socket Service] Starting 15s REST polling fallback for order: ${orderId}`);
  
  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      callback(response.data);
    } catch (err) {
      console.error('[Socket Service] REST fallback polling failed:', err.message);
    }
  };

  fetchOrder(); // Initial fetch
  return setInterval(fetchOrder, 15000); // 15 seconds polling interval
};
