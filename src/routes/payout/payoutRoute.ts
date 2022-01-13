import express, { Request, Response } from 'express';
import * as payoutService from '../../services/payout/payoutService';

const payoutRoute = express.Router();

payoutRoute.get('/', async (req: Request, res: Response, next) => {
  try {
    const result = await payoutService.getAllItems();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

payoutRoute.get('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const result = await payoutService.getItem(parseInt(id));
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

payoutRoute.post('/', async (req: Request, res: Response, next) => {
  const { seller_reference, amount, currency } = req.body;
  try {
    const result = await payoutService.addItem({
      seller_reference,
      currency,
      amount
    });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

payoutRoute.delete('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    await payoutService.deleteItem(parseInt(id));
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default payoutRoute;
