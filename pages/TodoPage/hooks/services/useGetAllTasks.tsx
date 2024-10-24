import { useQuery } from '@tanstack/react-query';

import { getAllTasks } from '@/services/Todo';

export const useGetAllTasks = () => {
  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(),
    initialData: [],
  });
  return { tasksData, isLoading };
};
