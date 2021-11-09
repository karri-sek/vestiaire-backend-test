import { Pool } from 'pg';
import {
  AddTaskPayload,
  TaskEntity,
  UpdateTaskPayload
} from '../models/taskModel';

const pool = new Pool();

export const getAllTasksFromDB = async () => {
  const { rows: taskEntities } = await pool.query<TaskEntity>(
    'SELECT * FROM task'
  );
  return taskEntities;
};

export const getTaskFromDB = async (id: number) => {
  const {
    rows: [taskEntity]
  } = await pool.query<TaskEntity>('SELECT * FROM task WHERE id = $1', [id]);
  return taskEntity;
};

export const addTaskToDB = async ({
  title,
  description = ''
}: AddTaskPayload) => {
  const {
    rows: [taskEntity]
  } = await pool.query<TaskEntity>(
    `insert into task(title, description) values($1, $2) returning *`,
    [title, description]
  );
  return taskEntity;
};

export const updateTaskInDB = async ({
  id,
  title = null,
  description = null
}: UpdateTaskPayload) => {
  const {
    rows: [taskEntity]
  } = await pool.query<TaskEntity>(
    `update task set title=coalesce($1, title), description=coalesce($2, description) where id=$3 returning *`,
    [title, description, id]
  );
  return taskEntity;
};

export const deleteAllTasksFromDB = async () => {
  const { rows: taskEntities } = await pool.query('DELETE FROM task');
  return taskEntities;
};

export const deleteTaskFromDB = async (id: number) => {
  return pool.query<TaskEntity>('DELETE FROM task where id = $1', [id]);
};
