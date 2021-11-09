import { Router , Request, Response } from 'express';
import {
  addTaskList,
  addTaskToTaskList,
  getAllTaskLists,
  getTaskList,
  removeTaskFromTaskList
} from '../../services/taskList/taskListService';

const taskListRoute = Router();

taskListRoute.get('/', async (req:Request, res:Response, next) => {
  try {
    const result = await getAllTaskLists();
    return res.status(200).json(result.rows);
  } catch (e) {
    next(e);
  }
});

taskListRoute.get('/:id', async (req:Request, res:Response, next) => {
  const { id } = req.params;
  try {
    const result = await getTaskList(parseInt(id));
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

taskListRoute.post('/', async (req, res, next) => {
  const { title } = req.body;
  try {
    const result = await addTaskList({ title });
    return res.status(201).json(result);
  } catch (e) {
    next;
  }
});

taskListRoute.post('/:id/task-attach', async (req, res, next) => {
  const { id } = req.params;
  const { taskId } = req.body;
  const taskListId = parseInt(id);
  try {
    const result = addTaskToTaskList({ taskListId, taskId });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

taskListRoute.delete('/:id/task-attach/:taskId', async (req, res, next) => {
  const { id, taskId } = req.params;
  const taskListId = parseInt(id);
  try {
    const result = removeTaskFromTaskList({
      taskListId,
      taskId: parseInt(taskId)
    });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

export default taskListRoute;
