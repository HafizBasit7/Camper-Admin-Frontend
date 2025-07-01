import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {  fetchAllUsers, updateUserStatus, fetchVehicleStats, fetchOwnerStats,fetchOwnerVehicles, updateVehicleStatus, fetchDashboardStats, fetchRecentActivities  } from '../hooks/api'; // Correct import path



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

export const useSuspendUser = () => {
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
