import express from 'express';
import serverless from 'serverless-http';
import itemRoute from './routes/item/itemRoute';
import soldItemRoute from './routes/soldItem/soldItemRoute';

const app = express();
app.use(express.json());
app.use('/items', itemRoute);
app.use('/sold-items', soldItemRoute);
export { app };
export const handler = serverless(app);
