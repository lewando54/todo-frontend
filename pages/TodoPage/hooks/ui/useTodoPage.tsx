import { useEffect, useState } from 'react';

import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';

import { useDeleteTask } from '../services/useDeleteTask';
import { useGetAllTasks } from '../services/useGetAllTasks';
import { useUpdateTask } from '../services/useUpdateTask';
import { TodoStatus } from '@/constants/Enums';
import { TaskStatus, TaskWithPending } from '@/constants/Types';

export const useTodoPage = () => {
  const { tasksData, isLoading, refetch } = useGetAllTasks();
  const [tasks, setTasks] = useState<TaskWithPending[]>([]);

  const { deleteTask, isDeletePending } = useDeleteTask();
  const { updateTask, isUpdatePending } = useUpdateTask();

  const isPending = {
    delete: isDeletePending,
    update: isUpdatePending,
  };

  useEffect(() => {
    if (!tasksData) return;
    setTasks(() => tasksData.map((task) => ({ ...task, isPending: false })));
  }, [tasksData, isLoading]);

  const statusFromAction = (action: TaskStatus) =>
    action === TodoStatus.TODO
      ? TodoStatus.ACTIVE
      : action === TodoStatus.ACTIVE
        ? TodoStatus.COMPLETED
        : TodoStatus.TODO;

  const onRefresh = () => {
    refetch();
  };

  const onAdd = () => {
    router.navigate('/(tabs)/task/create');
  };

  const onDetails = (id: number) => {
    router.navigate(`/task/${id}`);
  };

  const onEdit = (id: number) => {
    router.navigate(`/task/${id}/edit`);
  };

  const onDelete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isPending: true } : task,
      ),
    );
    deleteTask(id, {
      onSuccess: () => {
        Toast.success('Task deleted successfully');
      },
      onError: () => {
        Toast.error('Failed to delete task');
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isPending: false } : task,
          ),
        );
      },
    });
  };

  const onAction = (id: number, action: TaskStatus) => {
    updateTask(
      {
        id,
        task: {
          status: statusFromAction(action),
        },
      },
      {
        onSuccess: () => {
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
        },
        onError: () => {
          Toast.error('Failed to update task');
        },
      },
    );
  };

  return {
    tasks,
    isLoading,
    isPending,
    onAdd,
    onDetails,
    onEdit,
    onDelete,
    onAction,
    onRefresh,
  };
};
