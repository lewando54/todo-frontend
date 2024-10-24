import { Task, TaskCreate, TaskUpdate } from '@/constants/Types';
import Axios from '@/utils/Axios';
import { queryClient } from '@/utils/queryClient';

const TODO_API = '/tasks';

export const getAllTasks = async (): Promise<Task[]> => {
  return await Axios.get(TODO_API);
};

export const getTaskById = async (id: number): Promise<Task> => {
  return await Axios.get(`${TODO_API}/${id}`);
};

export const createTask = async (todo: TaskCreate): Promise<Task> => {
  return await Axios.post(TODO_API, todo).then((res) => {
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
    });
    return res.data;
  });
};

export const updateTaskById = async (
  id: number,
  task: TaskUpdate,
): Promise<Task> => {
  return await Axios.put(`${TODO_API}/${id}`, task).then((res) => {
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
    });
    queryClient.invalidateQueries({
      queryKey: ['task', id],
    });
    return res.data;
  });
};

export const deleteTaskById = async (id: number): Promise<Task> => {
  return await Axios.delete(`${TODO_API}/${id}`).then((res) => {
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
    });
    return res.data;
  });
};
