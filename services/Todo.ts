import { Task, TaskCreate, TaskUpdate } from '@/constants/Types';
import Axios from '@/utils/Axios';

const TODO_API = '/tasks';

export const getAllTasks = async (): Promise<Task[]> => {
  return await Axios.get(TODO_API);
};

export const getTaskById = async (id: number): Promise<Task> => {
  return await Axios.get(`${TODO_API}/${id}`);
};

export const createTask = async (todo: TaskCreate): Promise<Task> => {
  return await Axios.post(TODO_API, todo);
};

export const updateTaskById = async (
  id: number,
  task: TaskUpdate,
): Promise<Task> => {
  return await Axios.put(`${TODO_API}/${id}`, task);
};

export const deleteTaskById = async (id: number): Promise<Task> => {
  return await Axios.delete(`${TODO_API}/${id}`);
};
