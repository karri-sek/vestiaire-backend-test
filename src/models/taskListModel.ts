import { TaskEntity } from './taskModel';

type Timestamp = string;

export type TaskListEntity = {
  id: number;
  title: string;
  updatedAt: Timestamp;
};

export type TaskList = {
  id: number;
  title: string;
  tasks: TaskEntity[];
};

export type AddTaskListPayload = {
  title: string;
};
export type AddTaskToTaskListPayload = {
  taskListId: number;
  taskId: number;
};
export type RemoveTaskInTaskListPayload = {
  taskListId: number;
  taskId: number;
};
