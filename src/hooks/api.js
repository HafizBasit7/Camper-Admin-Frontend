import api from '../api/api';


export async function logoutAdmin() {
  /*   API is stateless → we only drop the token on the client.      *
   *   If later you add a blacklist endpoint, call it here as well.  */
  setToken(null);
  return true;
}


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
// ✅ This is good
export const updateUserStatus = async ({ userId, ...updates }) => {
  const res = await api.patch(`/admin/users/${userId}`, updates);
  return res.data;
};



/** Owner‑level camper / booking stats */
export const fetchOwnerStats = async () => {
  const res = await api.get('/admin/vehicles/stats-by-owner');
  return res.data ?? [];        // always return an array
};

export const fetchVehicleStats = async () => {
  // The endpoint returns a *plain array*, no wrapper.
  const res = await api.get('/admin/vehicles/stats-by-owner');
  return res.data ?? [];               // always return an array
};


/* GET /admin/vehicles?owner={id}&search=&status= */
export const fetchOwnerVehicles = async (ownerId, params = {}) => {
  if (!ownerId) return [];

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v !== undefined)
  );

  const res = await api.get(`/admin/vehicles/${ownerId}`, {
    params: cleaned, // send any other filters
  });

  return res.data ?? []; // your backend returns a plain array
};


/* PATCH /admin/vehicles/:vehicleId/status
   body: { status : "approved" | "pending" | "suspended" | "rejected" } */
export const updateVehicleStatus = async ({ vehicleId, status }) => {
  if (!vehicleId) throw new Error('vehicleId is required');
  const { data } = await api.patch(`/admin/vehicles/${vehicleId}/status`, { status })

  // backend returns e.g. { success:true, vehicle:{ …updated doc… } }
  return data.vehicle;
};


//Dashboard's Api's

export const fetchDashboardStats = async () => {
  const { data } = await api.get('/admin/dashboard');   // -> { totalUsers, … }
  return data ?? {};
};

/* GET /admin/dashboard/recentActivites  ---------------------------------- */
export const fetchRecentActivities = async () => {
  const { data } = await api.get('/admin/dashboard/recentActivites');
  return data ?? [];              // guaranteed array
};

// Fetch pending items (users or campers)
// api.js or hooks/api.js
/* GET /admin/dashboard/pending/:type  --------------------------- */
export const fetchPendingItems = async (type) => {
  const { data } = await api.get(`/admin/dashboard/pending/${type}`);
  return data ?? [];
};





// api/orders.js or wherever you defined fetchAllOrders
export const fetchAllOrders = async (status = 'all', params = { page: 1, limit: 10 }) => {
  const queryParams = {
    ...(status !== 'all' && { status }),
    page: params.page,
    limit: params.limit,
  };

  const res = await api.get('admin/orders/getOrders', {
    params: queryParams,
  });

  return res.data?.data ?? { orders: [], total: 0 }; // assuming API returns { orders: [], total: number }
};


/** GET /api/orders/getOrders/:orderId */
export const fetchOrderById = async (orderId) => {
  const res = await api.get(`admin/orders/getOrders/${orderId}`);
  return res.data?.data ?? null;
};
