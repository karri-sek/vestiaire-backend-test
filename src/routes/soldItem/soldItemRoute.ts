import express, { Request, Response } from 'express';
import { UpdateSoldItemPayload } from '../../models/soldItemModel';
import * as soldItemService from '../../services/soldItem/soldItemService';

const itemRoute = express.Router();

itemRoute.get('/', async (req: Request, res: Response, next) => {
  try {
    const result = await soldItemService.getAllItems();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.get('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const result = await soldItemService.getSoldItem(parseInt(id));
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.post('/', async (req: Request, res: Response, next) => {
  try {
    const result = await soldItemService.addSoldItems(req.body);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.patch('/:id', async (req: Request, res: Response, next) => {
  const { item_id, no_of_items, seller_reference } = req.body;
  const { id } = req.params;
  const updateItem: UpdateSoldItemPayload = {
    id: parseInt(id),
    item_id,
    no_of_items,
    seller_reference
  };
  try {
    const result = await soldItemService.updateItem(updateItem);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

itemRoute.delete('/', async (req: Request, res: Response, next) => {
  try {
    await soldItemService.deleteAllItems();
    return res.status(200).json();
  } catch (e) {
    next(e);
  }
});

itemRoute.delete('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    await soldItemService.deleteItem(parseInt(id));
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default itemRoute;
