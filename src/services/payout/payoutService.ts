import {
  getPayoutFromDB,
  getAllPayouts,
  addPayoutToDB,
  removePayoutFromDB
} from '../../repositories/payoutRepository';

import { AddPayoutPayload } from '../../models/payoutModel';
import { AddSoldItemPayload, SoldItemsType } from '../../models/soldItemModel';

import { ItemEntity } from '../../models/itemModel';

export const getAllItems = async () => await getAllPayouts();

export const getItem = async (id: number) => await getPayoutFromDB(id);

export const addItem = async (addItemRequest: AddPayoutPayload) =>
  await addPayoutToDB(addItemRequest);

export const deleteItem = async (id: number) => await removePayoutFromDB(id);

export const calculatePayouts = async (sellersDetails) => {
  for (let sellerReference of sellersDetails.keys()) {
    const itemsArray: SoldItemsType[] = sellersDetails.get(sellerReference);
    if (itemsArray.length === 1) {
      const { item, totalAmount }: SoldItemsType = itemsArray[0];
      const payoutItem: AddPayoutPayload = {
        seller_reference: sellerReference,
        currency: item.price_currency,
        amount: totalAmount
      };
      await addItem(payoutItem);
    } else {
      //split the payout into multiple payouts if the total amount of all the items exceed certain limit
      let allItemsSoldAmount: number = 0;
      itemsArray.map(
        (soldItem: SoldItemsType) =>
          (allItemsSoldAmount += soldItem.totalAmount)
      );
      const { price_currency: currency } = itemsArray[0].item;
      if (allItemsSoldAmount > 1000) {
        const leftOverSplitAmount: number = allItemsSoldAmount % 1000;
        let noOfSplitPayouts: number =
          (allItemsSoldAmount - leftOverSplitAmount) / 1000;
        while (noOfSplitPayouts > 1) {
          const payoutItem: AddPayoutPayload = {
            seller_reference: sellerReference,
            currency,
            amount: 1000
          };
          await addItem(payoutItem);
          noOfSplitPayouts--;
        }
        //insert last payout for left over amount
        const payoutItem: AddPayoutPayload = {
          seller_reference: sellerReference,
          currency,
          amount: leftOverSplitAmount
        };
        await addItem(payoutItem);
      } else {
        itemsArray.map(async (soldItem: SoldItemsType) => {
          const payoutItem: AddPayoutPayload = {
            seller_reference: sellerReference,
            currency,
            amount: soldItem.totalAmount
          };
          await addItem(payoutItem);
        });
      }
    }
  }
};
