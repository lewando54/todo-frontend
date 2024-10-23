import { TaskStatus } from "./Enums";

export type Task = {
    id: number,
    creationDate: Date,
    title: string,
    description: string,
    status: TaskStatus,
} 