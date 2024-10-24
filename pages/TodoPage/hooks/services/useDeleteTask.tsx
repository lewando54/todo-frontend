import { useMutation } from '@tanstack/react-query';

import { deleteTaskById } from '@/services/Todo';

export const useDeleteTask = () => {
  const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number) => deleteTaskById(id),
  });

  return { deleteTask, isDeletePending };
};
