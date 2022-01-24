import express from 'express';
import serverless from 'serverless-http';
import itemRoute from './routes/item/itemRoute';
import soldItemRoute from './routes/soldItem/soldItemRoute';
import sellerRoute from './routes/seller/sellerRoute';
import payoutRoute from './routes/payout/payoutRoute';


const app = express();
app.use(express.json());
app.use('/items', itemRoute);
app.use('/sold-items', soldItemRoute);
app.use('/sellers', sellerRoute);
app.use('/payouts', payoutRoute);

export { app };
export const handler = serverless(app);
