import { z } from 'zod';

import { TodoStatus } from './Enums';

export const AddTaskSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
});

export const EditTaskSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  status: z.nativeEnum(TodoStatus),
});
