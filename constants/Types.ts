import { TodoStatus } from './Enums';

export type Task = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  status: TodoStatus;
};

export type TaskWithPending = Task & {
  isPending: boolean;
};

export type TaskCreate = {
  title: string;
  description: string;
};

export type TaskUpdate = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export type Option = {
  value: string;
  label: string;
};

export type TaskStatus = keyof typeof TodoStatus;
