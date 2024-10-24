import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Toast } from 'toastify-react-native';

import { useCreateTask } from '../services/useCreateTask';
import { AddTaskSchema } from '@/constants/ValidationSchemas';

export type AddTaskFormData = {
  title: string;
  description: string;
};

export const useTaskAddPage = () => {
  const { createNewTask, isCreatePending } = useCreateTask();

  const methods = useForm<AddTaskFormData>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(AddTaskSchema),
  });

  const onSubmit = methods.handleSubmit((data) => {
    createNewTask(data, {
      onSuccess: () => {
        methods.reset();
        Toast.success('Task added successfully');
        router.navigate('/');
      },
      onError: () => {
        Toast.error('Failed to add task');
      },
    });
  });

  return { methods, isCreatePending, onSubmit };
};
