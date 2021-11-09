import {
  addTaskToDB,
  deleteTaskFromDB,
  deleteAllTasksFromDB,
  getAllTasksFromDB,
  getTaskFromDB,
  updateTaskInDB
} from '../../repositories/taskRepository';

import { AddTaskPayload, UpdateTaskPayload } from '../../models/taskModel';

export const getAllTasks = async () => await getAllTasksFromDB();

export const getTask = async (id: number) => await getTaskFromDB(id);

export const addTask = async (addTaskRequest: AddTaskPayload) =>
  await addTaskToDB(addTaskRequest);

export const updateTask = async (updateTakeRequest: UpdateTaskPayload) =>
  await updateTaskInDB(updateTakeRequest);

export const deleteAllTasks = async () => await deleteAllTasksFromDB();

export const deleteTask = async (id: number) => await deleteTaskFromDB(id);
