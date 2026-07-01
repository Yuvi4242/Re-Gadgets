/**
 * Centralized role-to-dashboard routing helper.
 * This is the SINGLE SOURCE OF TRUTH for all dashboard redirects.
 * Use this everywhere instead of duplicating the map.
 */
export const DASHBOARD_ROUTES = {
  customer: '/customer/dashboard',
  technician: '/technician/dashboard',
  shopOwner: '/shopowner/dashboard',
  admin: '/admin/dashboard',
};

/**
 * @param {string} role - The user's role ('customer', 'technician', 'shopOwner', 'admin')
 * @returns {string} The correct dashboard route for the role.
 */
export const getDashboardRoute = (role) => {
  return DASHBOARD_ROUTES[role] || '/customer/dashboard';
};
