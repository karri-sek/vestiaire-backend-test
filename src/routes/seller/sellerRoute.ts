import express, { Request, Response } from 'express';
import * as sellerService from '../../services/seller/sellerService';

const sellerRoute = express.Router();

sellerRoute.get('/', async (req: Request, res: Response, next) => {
  try {
    const result = await sellerService.getAllItems();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

sellerRoute.get('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const result = await sellerService.getItem(parseInt(id));
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

sellerRoute.post('/', async (req: Request, res: Response, next) => {
  const { seller_reference, seller_location } = req.body;
  try {
    const result = await sellerService.addItem({
      seller_reference,
      seller_location,
    });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

sellerRoute.delete('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    await sellerService.deleteItem(parseInt(id));
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default sellerRoute;
