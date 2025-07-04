import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {  fetchAllUsers, updateUserStatus, fetchVehicleStats, fetchOwnerStats,fetchOwnerVehicles, updateVehicleStatus, fetchDashboardStats, fetchRecentActivities, fetchAllOrders, fetchOrderById, fetchPendingItems } from '../hooks/api'; // Correct import path



import { clearToken } from '../../utils/index';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();        // remove token
    navigate('/login');  // navigate to login
  };

  return logout;
};



export const useAllUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchAllUsers(params),
    keepPreviousData: true,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};




export const useVehicleStats = () =>
  useQuery({
    queryKey: ['vehicleStats'],
    queryFn: fetchVehicleStats,
    staleTime: 1_000 * 60 * 5, // 5 min
    retry: 2,
  });



  export const useOwnerStats = () =>
  useQuery({
    queryKey: ['ownerStats'],
    queryFn: fetchOwnerStats,
    staleTime: 1_000 * 60 * 5,   // 5 minutes
    retry: 2,
  });



  export const useOwnerVehicles = (ownerId, params = {}) =>
  useQuery({
    queryKey: ['ownerVehicles', ownerId, params],
    queryFn: () => fetchOwnerVehicles(ownerId, params),
    enabled: !!ownerId,          // don’t run until we have an id
    staleTime: 1_000 * 60 * 2,   // 2 min
  });


  


/** change ONE camper / vehicle’s status */
export const useUpdateVehicleStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateVehicleStatus,

    /* optimistic‑UI update */
    onMutate: async ({ vehicleId, status }) => {
      await qc.cancelQueries({ queryKey: ['ownerVehicles'] });

      const prev = qc.getQueryData(['ownerVehicles']);
      qc.setQueryData(['ownerVehicles'], old =>
        old?.map(v => (v.id === vehicleId ? { ...v, status } : v)),
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      // roll back
      qc.setQueryData(['ownerVehicles'], ctx?.prev);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['ownerVehicles'] });
    },
  });
};


//Dasboard Mutation
export const useDashboardStats = () =>
  useQuery({
    queryKey : ['dashboardStats'],
    queryFn  : fetchDashboardStats,
    staleTime: 1000 * 60 * 5,     // 5 min
    retry    : 2,
  });

export const useRecentActivities = () =>
  useQuery({
    queryKey : ['recentActivities'],
    queryFn  : fetchRecentActivities,
    staleTime: 1000 * 60,         // 1 min
    retry    : 1,
  });

export const usePendingItems = (type) =>
  useQuery({
    queryKey: ['pendingItems', type],
    queryFn: () => fetchPendingItems(type),
    enabled: !!type,
    staleTime: 1000 * 60,
  });

//   export const updateItemStatus = async (type, { id, status }) => {
//   try {
//     const res = await api.patch(`/admin/vehicles/update-status/${type}`, {
//       id,
//       status,
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error updating item status:", error);
//     throw error;
//   }
// };



   export const useAllOrders = (status = 'all', params = { page: 1, limit: 10 }) =>
  useQuery({
    queryKey: ['orders', status, params.page],
    queryFn: () => fetchAllOrders(status, params),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

export const useOrderById = (orderId) =>
  useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
  });