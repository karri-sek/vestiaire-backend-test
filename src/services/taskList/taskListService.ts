import {
  addTaskListToDB,
  addTaskToTaskListInDB,
  getAllTaskListsFromDB,
  getTaskListFromDB,
  getTaskListTasks,
  removeTaskInTaskListInDB
} from '../../repositories/taskListRepository';

import {
  AddTaskListPayload,
  AddTaskToTaskListPayload,
  RemoveTaskInTaskListPayload
} from '../../models/taskListModel';

export const getAllTaskLists = async () => await getAllTaskListsFromDB();

export const getTaskList = async (id: number) => {
  const taskList = await getTaskListFromDB(id)
  const taskListTasks = await getTaskListTasks(id)
  return { ...taskList, tasks: taskListTasks }
};

export const addTaskList = async (addTaskListRequest: AddTaskListPayload) =>
  await addTaskListToDB(addTaskListRequest);

export const addTaskToTaskList = async (
  reqPayload: AddTaskToTaskListPayload
) => {
  await addTaskToTaskListInDB(reqPayload);
  return getTaskList(reqPayload.taskListId);
};
export const removeTaskFromTaskList = async (
  reqPayload: RemoveTaskInTaskListPayload
) => {
  await removeTaskInTaskListInDB(reqPayload);
  return getTaskList(reqPayload.taskListId);
};
