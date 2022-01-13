import express, { Request, Response } from 'express';
import { UpdateItemPayload } from '../../models/itemModel';
import * as itemService from '../../services/item/itemService';

const itemRoute = express.Router();

itemRoute.get('/', async (req: Request, res: Response, next) => {
  try {
    const result = await itemService.getAllItems();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.get('/:item_name', async (req: Request, res: Response, next) => {
  const { item_name } = req.params;
  try {
    const result = await itemService.getItem(item_name);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.post('/', async (req: Request, res: Response, next) => {
  const { item_name, price_currency, price_amount } = req.body;
  try {
    const result = await itemService.addItem({
      item_name,
      price_currency,
      price_amount
    });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.patch('/:id', async (req: Request, res: Response, next) => {
  const { item_name, price_currency, price_amount } = req.body;
  const { id } = req.params;
  const updateItem: UpdateItemPayload = {
    id: parseInt(id),
    item_name,
    price_currency,
    price_amount
  };
  try {
    const result = await itemService.updateItem(updateItem);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.delete('/', async (req: Request, res: Response, next) => {
  try {
    await itemService.deleteAllItems();
    return res.status(200).json();
  } catch (e) {
    next(e);
  }
});

itemRoute.delete('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    await itemService.deleteItem(parseInt(id));
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default itemRoute;
