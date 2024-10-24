import { useEffect, useState } from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import { Toast } from 'toastify-react-native';

import { useDeleteTask } from '../services/useDeleteTask';
import { useGetTask } from '../services/useGetTask';
import { Task } from '@/constants/Types';

export const useTaskDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { taskData, isLoading, isError } = useGetTask(Number(id));

  const { deleteTask, isDeletePending } = useDeleteTask();

  const [taskDetails, setTaskDetails] = useState(taskData || ({} as Task));

  const onDelete = () => {
    deleteTask(Number(id), {
      onSuccess: () => {
        router.replace('/');
        Toast.success('Task deleted successfully');
      },
      onError: () => {
        Toast.error('Failed to delete task');
      },
    });
  };

  const onEdit = () => {
    router.navigate(`/task/${id}/edit`);
  };

  useEffect(() => {
    if (isError) {
      router.replace('/');
      Toast.error('Failed to fetch task details');
    }
  }, [isError]);

  useEffect(() => {
    if (taskData) setTaskDetails(() => taskData);
  }, [taskData]);

  return { taskDetails, isLoading, isError, isDeletePending, onDelete, onEdit };
};
