import { useMutation } from '@tanstack/react-query';

import { TaskUpdate } from '@/constants/Types';
import { updateTaskById } from '@/services/Todo';

interface IUpdateTaskParams {
  id: number;
  task: TaskUpdate;
}

export const useUpdateTask = () => {
  const { mutate: updateTask, isPending: isUpdatePending } = useMutation({
    mutationFn: ({ id, task }: IUpdateTaskParams) => updateTaskById(id, task),
  });

  return { updateTask, isUpdatePending };
};
