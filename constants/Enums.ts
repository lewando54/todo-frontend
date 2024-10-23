export enum TodoStatus {
    TODO = 'TODO',
    ACTIVE = 'ACTIVE',
    COMPLETED  = 'COMPLETED'
}

export type TaskStatus = keyof typeof TodoStatus;