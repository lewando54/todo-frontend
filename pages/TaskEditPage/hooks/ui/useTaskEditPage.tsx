import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Toast } from 'toastify-react-native';

import { useGetTask } from '../services/useGetTask';
import { useUpdateTask } from '../services/useUpdateTask';
import { TodoStatus } from '@/constants/Enums';
import { EditTaskSchema } from '@/constants/ValidationSchemas';
import { capitalize } from '@/utils/utils';

export type EditTaskFormData = {
  title: string;
  description: string;
  status: TodoStatus;
};

export const useTaskEditPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { taskData, isLoading, isError } = useGetTask(Number(id));
  const { updateTask, isUpdatePending } = useUpdateTask(Number(id));

  const methods = useForm<EditTaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      status: TodoStatus.TODO,
    },
    resolver: zodResolver(EditTaskSchema),
  });

  useEffect(() => {
    if (taskData?.title && taskData?.description && taskData?.status) {
      methods.reset({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
      });
    }
  }, [taskData, methods]);

  const statusKeys = Object.keys(TodoStatus);

  const taskStatusOptions = useMemo(
    () =>
      statusKeys.map((status) => ({
        value: status,
        label: capitalize(status),
      })),
    [statusKeys],
  );

  useEffect(() => {
    if (isError) {
      router.navigate('/');
      Toast.error('Failed to fetch task details');
    }
  }, [isError]);

  const onSubmit = methods.handleSubmit((data) => {
    updateTask(data, {
      onSuccess: () => {
        Toast.success('Task edited successfully');
        router.navigate('/');
      },
      onError: () => {
        Toast.error('Failed to edit task');
      },
    });
  });

  return {
    methods,
    taskStatusOptions,
    isUpdatePending,
    isLoading,
    onSubmit,
    taskData,
  };
};
