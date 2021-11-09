import { Pool } from 'pg';
import { AddTaskListPayload, TaskListEntity } from '../models/taskListModel';

export const pool = new Pool();

export const getAllTaskListsFromDB = async () =>
  await pool.query<TaskListEntity>('SELECT * FROM tasklist');

export const getTaskListFromDB = async (id: number) =>{
   const { rows: [entity] } = await pool.query<TaskListEntity>(
    `SELECT * FROM tasklist WHERE tasklist.id = $1`,
    [id]
  )
  return entity;
};

export const getTaskListTasks = async (id: number) => {
  const { rows: taskEntities } = await pool.query<TaskListEntity>(
    `select task.id, task.title,task.description from task_tasklist join task on task_tasklist.task_id = task.id where task_tasklist.tasklist_id = $1`,
    [id]
  );
  return taskEntities;
};

export const addTaskListToDB = async ({ title }: AddTaskListPayload) => {
  const {
    rows: [tasklistEntity]
  } = await pool.query<TaskListEntity>(
    `insert into tasklist(title) values($1) returning *`,
    [title]
  );
  return tasklistEntity;
};

export const addTaskToTaskListInDB = async ({ taskListId, taskId }) => {
  const {
    rows: [tasklistEntity]
  } = await pool.query<TaskListEntity>(
    `insert into task_tasklist(tasklist_id, task_id) values($1, $2) returning *`,
    [taskListId, taskId]
  );
  return tasklistEntity;
};
export const removeTaskInTaskListInDB = async ({ taskListId, taskId }) => {
  const {
    rows: [tasklistEntity]
  } = await pool.query<TaskListEntity>(
    `delete from task_tasklist where (tasklist_id, task_id) = ($1, $2)`,
    [taskListId, taskId]
  );
  return tasklistEntity;
};
