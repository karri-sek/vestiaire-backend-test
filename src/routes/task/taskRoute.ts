import express, { Request, Response }  from 'express';
import { UpdateTaskPayload } from '../../models/taskModel';
import * as taskService from '../../services/task/taskService';

const taskRoute = express.Router();

taskRoute.get('/', async (req:Request, res: Response, next) => {
  try {
    const result = await taskService.getAllTasks();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

taskRoute.get('/:id', async (req:Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const result = await taskService.getTask(parseInt(id));
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

taskRoute.post('/', async (req:Request, res: Response, next) => {
  const { title, description } = req.body;
  try {
    const result = await taskService.addTask({ title, description });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

taskRoute.patch('/:id', async (req:Request, res: Response, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const updateTask: UpdateTaskPayload = {
    id: parseInt(id),
    title,
    description
  };
  try {
    const result = await taskService.updateTask(updateTask);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

taskRoute.delete('/', async (req:Request, res: Response, next) => {
  try {
    await taskService.deleteAllTasks();
    return res.status(200).json();
  } catch (e) {
    next(e);
  }
});

taskRoute.delete('/:id', async (req:Request, res: Response, next) => {
  const { id } = req.params;
  try {
    await taskService.deleteTask(parseInt(id));
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default taskRoute;
