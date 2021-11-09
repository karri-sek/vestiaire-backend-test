import express from 'express';
import serverless from 'serverless-http';
import taskRoute from './routes/task/taskRoute';
import taskListRoute from './routes/taskList/taskListRoute';

const app = express();
app.use(express.json());
app.use('/tasks', taskRoute);
app.use('/task-lists', taskListRoute);

export { app };
export const handler = serverless(app);
