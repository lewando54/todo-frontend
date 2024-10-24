import { useMutation } from '@tanstack/react-query';

import { TaskUpdate } from '@/constants/Types';
import { updateTaskById } from '@/services/Todo';

export const useUpdateTask = (id: number) => {
  const { mutate: updateTask, isPending: isUpdatePending } = useMutation({
    mutationFn: (task: TaskUpdate) => updateTaskById(id, task),
  });

  return { updateTask, isUpdatePending };
};
