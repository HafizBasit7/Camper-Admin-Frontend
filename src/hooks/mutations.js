import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllUsers, updateUserStatus } from '../hooks/api'; // Correct import path

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