import {
  addSellerToDB,
  deleteAllSellersFromDB,
  deleteSellerFromDB,
  getSellerFromDB,
  getAllSellerFromDB,
  updateSellerInDB
} from '../../repositories/sellerRepository';

import {
  AddSellerPayload,
  UpdateSellerPayload
} from '../../models/sellerModel';

export const getAllItems = async () => await getAllSellerFromDB();

export const getItem = async (id: number) => await getSellerFromDB(id);

export const addItem = async (addItemRequest: AddSellerPayload) =>
  await addSellerToDB(addItemRequest);

export const updateItem = async (updateTakeRequest: UpdateSellerPayload) =>
  await updateSellerInDB(updateTakeRequest);

export const deleteAllItems = async () => await deleteAllSellersFromDB();

export const deleteItem = async (id: number) => await deleteSellerFromDB(id);
