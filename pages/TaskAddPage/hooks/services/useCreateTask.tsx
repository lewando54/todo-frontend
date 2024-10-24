import { useMutation } from '@tanstack/react-query';

import { TaskCreate } from '@/constants/Types';
import { createTask } from '@/services/Todo';

export const useCreateTask = () => {
  const { mutate: createNewTask, isPending: isCreatePending } = useMutation({
    mutationFn: (task: TaskCreate) => createTask(task),
  });

  return { createNewTask, isCreatePending };
};
