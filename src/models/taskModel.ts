type Timestamp = string;

export type TaskEntity = {
  id: number;
  title: string;
  description: string;
  updated_at: Timestamp;
};

export type AddTaskPayload = {
  title: string;
  description?: string;
};

export type UpdateTaskPayload = {
  id: number;
  title?: string;
  description?: string;
};
