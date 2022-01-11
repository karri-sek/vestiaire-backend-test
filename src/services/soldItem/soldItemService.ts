import {
  deleteSoldItemFromDB,
  deleteAllSoldItemsFromDB,
  getAllISoldItemsFromDB,
  getSoldItemFromDB,
  updateSoldItemInDB,
  addListOfSoldItems
} from '../../repositories/soldItemRepository';

import {
  AddSoldItemPayload,
  UpdateSoldItemPayload
} from '../../models/soldItemModel';

export const getAllItems = async () => await getAllISoldItemsFromDB();

export const getItem = async (id: number) => await getSoldItemFromDB(id);

export const addSoldItems = async (addItemRequest: [AddSoldItemPayload]) => await addListOfSoldItems(addItemRequest);

export const updateItem = async (updateTakeRequest: UpdateSoldItemPayload) =>
  await updateSoldItemInDB(updateTakeRequest);

export const deleteAllItems = async () => await deleteAllSoldItemsFromDB();

export const deleteItem = async (id: number) => await deleteSoldItemFromDB(id);
