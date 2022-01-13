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
  UpdateSoldItemPayload,
  SoldItemsType
} from '../../models/soldItemModel';

import { ItemEntity } from '../../models/itemModel';

import { getItem } from '../item/itemService';
export const getAllItems = async () => await getAllISoldItemsFromDB();

export const getSoldItem = async (id: number) => await getSoldItemFromDB(id);

export const addSoldItems = async (soldItems: AddSoldItemPayload[]) => {
  await addListOfSoldItems(soldItems);
  await mapSoldItemsToTheSeller(soldItems);
};

export const updateItem = async (updateTakeRequest: UpdateSoldItemPayload) =>
  await updateSoldItemInDB(updateTakeRequest);

export const deleteAllItems = async () => await deleteAllSoldItemsFromDB();

export const deleteItem = async (id: number) => await deleteSoldItemFromDB(id);

export const mapSoldItemsToTheSeller = async (
  soldItems: AddSoldItemPayload[]
) => {
  const sellerReferenceMap = new Map<string, SoldItemsType[]>();
  for (let soldItem of soldItems) {
    const item: ItemEntity = await getItem(soldItem.item_name);
    const totalAmount: number = item.price_amount * soldItem.no_of_items;
    if (sellerReferenceMap.get(soldItem.seller_reference)) {
      const itemsArray: SoldItemsType[] = sellerReferenceMap.get(
        soldItem.seller_reference
      );
      itemsArray.push({ item, totalAmount });
    } else {
      const itemsArray: SoldItemsType[] = [{ item, totalAmount }];
      sellerReferenceMap.set(soldItem.seller_reference, itemsArray);
    }
  }
  return sellerReferenceMap;
};
