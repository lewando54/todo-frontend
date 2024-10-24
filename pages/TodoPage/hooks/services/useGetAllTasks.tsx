import { useQuery } from '@tanstack/react-query';

import { Task } from '@/constants/Types';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { getAllTasks } from '@/services/Todo';

export const useGetAllTasks = () => {
  const {
    data: tasksData,
    isLoading,
    refetch,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(),
  });
  useRefreshOnFocus(refetch);
  return { tasksData, isLoading, refetch };
};
