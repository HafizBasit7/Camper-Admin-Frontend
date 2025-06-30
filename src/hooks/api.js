import api from '../api/api';



// src/hooks/api.js
export const fetchAllUsers = async (params = {}) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v !== undefined)
  );

  const response = await api.get('/admin/users', { params: cleanedParams });

  const users = response.data?.data ?? [];
  const total = response.data?.pagination?.total ?? 0;

  return { users, total };
};




/**
 * PATCH /admin/users/:id/status
 * @param {Object} payload
 * @param {string} payload.userId   Mongo ObjectId
 * @param {string} payload.status   "active" | "suspended"
 * @param {string} [payload.reason] Suspension reason (optional)
 */
export const updateUserStatus = async ({ userId, status, reason }) => {
  try {
    const res = await api.patch(`/admin/users/${userId}/status`, {
      status,
      ...(reason && { reason }),      // include 'reason' only when provided
    });
    return res.data;                 // { success: true, message: "Status updated" }
  } catch (err) {
    console.error('Error updating user status:', err);
    throw err;
  }
};