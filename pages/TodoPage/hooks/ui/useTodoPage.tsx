import { useEffect, useState } from 'react';

import { Toast } from 'toastify-react-native';

import { useDeleteTask } from '../services/useDeleteTask';
import { useGetAllTasks } from '../services/useGetAllTasks';
import { useUpdateTask } from '../services/useUpdateTask';
import { TodoStatus } from '@/constants/Enums';
import { Task, TaskStatus } from '@/constants/Types';

export const useTodoPage = () => {
  const { tasksData, isLoading } = useGetAllTasks();
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const { deleteTask, isDeletePending } = useDeleteTask();
  const { updateTask, isUpdatePending } = useUpdateTask();

  const isPending = {
    delete: isDeletePending,
    update: isUpdatePending,
  };

  useEffect(() => {
    setTasks(() => tasksData);
  }, [tasksData]);

  const onDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    deleteTask(id);
    Toast.success('Task deleted successfully');
  };

  const statusFromAction = (action: TaskStatus) =>
    action === TodoStatus.TODO
      ? TodoStatus.ACTIVE
      : action === TodoStatus.ACTIVE
        ? TodoStatus.COMPLETED
        : TodoStatus.TODO;

  const onAction = (id: number, action: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: statusFromAction(action),
            }
          : task,
      ),
    );
    updateTask({
      id,
      task: {
        status: statusFromAction(action),
      },
    });
  };

  return { tasks, isLoading, isPending, onDelete, onAction };
};
