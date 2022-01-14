import {
  addItemToDB,
  deleteItemFromDB,
  deleteAllItemsFromDB,
  getAllItemsFromDB,
  getItemFromDB,
  updateItemInDB
} from '../../repositories/itemRepository';

import { AddItemPayload, UpdateItemPayload } from '../../models/itemModel';

export const getAllItems = async () => await getAllItemsFromDB();

export const getItem = async (item_name: string) =>
  await getItemFromDB(item_name);

export const addItem = async (addItemRequest: AddItemPayload) =>
  await addItemToDB(addItemRequest);

export const updateItem = async (updateTakeRequest: UpdateItemPayload) =>
  await updateItemInDB(updateTakeRequest);

export const deleteAllItems = async () => await deleteAllItemsFromDB();

export const deleteItem = async (id: number) => await deleteItemFromDB(id);
