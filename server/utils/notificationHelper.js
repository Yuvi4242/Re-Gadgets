import Notification from '../models/Notification.js';

/**
 * Create an in-app notification for a user.
 * Failures are logged but never throw — notification is best-effort.
 */
export const createNotification = async ({ userId, type, title, message, relatedOrder = null }) => {
  try {
    if (!userId) return null;
    return await Notification.create({
      user: userId,
      type: type || 'system',
      title,
      message,
      relatedOrder,
    });
  } catch (err) {
    console.error('Failed to create notification:', err.message);
    return null;
  }
};
