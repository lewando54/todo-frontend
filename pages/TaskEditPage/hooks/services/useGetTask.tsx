import { useQuery } from '@tanstack/react-query';

import { Task } from '@/constants/Types';
import { getTaskById } from '@/services/Todo';

export const useGetTask = (id: number) => {
  const {
    data: taskData,
    isLoading,
    isError,
  } = useQuery<Task>({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  return { taskData, isLoading, isError };
};
