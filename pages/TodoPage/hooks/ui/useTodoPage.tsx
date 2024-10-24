/* eslint-disable @typescript-eslint/no-require-imports */
import { useCallback, useEffect, useState } from 'react';

import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
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

  const [sound, setSound] = useState<Sound>();

  async function playDingSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/ding.mp3'),
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (!tasksData) return;
    setTasks(
      tasksData
        .map((task) => ({ ...task, isPending: false }))
        .sort((a, b) => {
          const statusOrder = {
            [TodoStatus.TODO]: 1,
            [TodoStatus.ACTIVE]: 2,
            [TodoStatus.COMPLETED]: 3,
          };
          return statusOrder[a.status] - statusOrder[b.status];
        }),
    );
  }, [tasksData, isLoading]);

  const statusFromAction = useCallback((action: TaskStatus) => {
    const statusTransitions = {
      [TodoStatus.TODO]: TodoStatus.ACTIVE,
      [TodoStatus.ACTIVE]: TodoStatus.COMPLETED,
      [TodoStatus.COMPLETED]: TodoStatus.TODO,
    };
    return statusTransitions[action];
  }, []);

  const onDelete = useCallback(
    (id: number) => {
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) return prevTasks;

        const newTasks = [...prevTasks];
        newTasks[taskIndex] = { ...newTasks[taskIndex], isPending: true };
        return newTasks;
      });

      deleteTask(id, {
        onSuccess: () => {
          Toast.success('Task deleted successfully');
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
    },
    [deleteTask],
  );

  const onAction = useCallback(
    (id: number, action: TaskStatus) => {
      const newStatus = statusFromAction(action);

      if (newStatus === TodoStatus.COMPLETED) {
        playDingSound();
      }

      updateTask(
        {
          id,
          task: { status: newStatus },
        },
        {
          onSuccess: () => {
            setTasks((prevTasks) => {
              const newTasks = prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task,
              );
              return newTasks.sort((a, b) => {
                const statusOrder = {
                  [TodoStatus.TODO]: 1,
                  [TodoStatus.ACTIVE]: 2,
                  [TodoStatus.COMPLETED]: 3,
                };
                return statusOrder[a.status] - statusOrder[b.status];
              });
            });
          },
          onError: () => {
            Toast.error('Failed to update task');
          },
        },
      );
    },
    [updateTask, statusFromAction],
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const onAdd = useCallback(() => {
    router.navigate('/(tabs)/task/create');
  }, []);

  const onDetails = useCallback((id: number) => {
    router.navigate(`/task/${id}`);
  }, []);

  const onEdit = useCallback((id: number) => {
    router.navigate(`/task/${id}/edit`);
  }, []);

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
