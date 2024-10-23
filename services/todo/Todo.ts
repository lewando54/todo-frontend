import { TaskCreate, TaskUpdate } from '@/constants/Types';
import Axios from '@/utils/Axios';

const TODO_API = '/todo';

export const getAllTodos = async () => {
  return await Axios.get(TODO_API);
};

export const getTodoById = async (id: number) => {
  return await Axios.get(`${TODO_API}/${id}`);
};

export const createTodo = async (todo: TaskCreate) => {
  return await Axios.post(TODO_API, todo);
};

export const updateTodo = async (id: number, todo: TaskUpdate) => {
  return await Axios.put(`${TODO_API}/${id}`, todo);
};

export const deleteTodo = async (id: number) => {
  return await Axios.delete(`${TODO_API}/${id}`);
};
