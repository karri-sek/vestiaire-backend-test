import {
  getPayoutFromDB,
  getAllPayouts,
  addPayoutToDB,
  removePayoutFromDB
} from '../../repositories/payoutRepository';

import { AddPayoutPayload } from '../../models/payoutModel';
import { SoldItemsType } from '../../models/soldItemModel';
import { PAYOUT_LIMIT } from '../../constants';
export const getAllItems = async () => await getAllPayouts();

export const getItem = async (id: number) => await getPayoutFromDB(id);

export const addItem = async (addItemRequest: AddPayoutPayload) =>
  await addPayoutToDB(addItemRequest);

export const deleteItem = async (id: number) => await removePayoutFromDB(id);

export const handleSingleSoldItem = async (
  itemsArray,
  sellerReference
): Promise<AddPayoutPayload[]> => {
  const { item, totalAmount }: SoldItemsType = itemsArray[0];
  const payoutItem: AddPayoutPayload = {
    seller_reference: sellerReference,
    currency: item.price_currency,
    amount: totalAmount
  };
  await addItem(payoutItem);
  return [payoutItem];
};

const getSplitsAndLeftOver = (itemsArray: SoldItemsType[]) => {
  let allItemsSoldAmount: number = 0;
  itemsArray.map(
    (soldItem: SoldItemsType) => (allItemsSoldAmount += soldItem.totalAmount)
  );
  const { price_currency: currency } = itemsArray[0].item;
  const leftOverSplitAmount: number = allItemsSoldAmount % PAYOUT_LIMIT;
  let noOfSplitPayouts: number =
    (allItemsSoldAmount - leftOverSplitAmount) / PAYOUT_LIMIT;
  return {
    totalAmount: allItemsSoldAmount,
    totalSplits: noOfSplitPayouts,
    currency
  };
};

const handleSplitAmount = async (amount: number, sellerReference: string, currency: string):Promise<AddPayoutPayload[]> => {
  if(amount<=0) return;
  const payoutItem: AddPayoutPayload = {
    seller_reference: sellerReference,
    currency,
    amount: amount
  };
  await addItem(payoutItem);
  return [payoutItem];
}

const handleSoldItemsAmountLessThenSplit = async (itemsArray, sellerReference, currency, ) => {
  const result = [];
  for(const soldItem of itemsArray){
    const payoutItem: AddPayoutPayload = {
      seller_reference: sellerReference,
      currency,
      amount: soldItem.totalAmount
    };
    result.push(payoutItem);
    await addItem(payoutItem);
  };
  return result;
}
export const calculatePayouts = async (sellersDetails) => {
  const result = [];
  for (let sellerReference of sellersDetails.keys()) {
    const itemsArray: SoldItemsType[] = sellersDetails.get(sellerReference);
    if (itemsArray.length === 1) {
      return handleSingleSoldItem(itemsArray, sellerReference);
    } else {
      let { totalAmount, totalSplits, currency } = getSplitsAndLeftOver(itemsArray);
      if (totalAmount > PAYOUT_LIMIT) {
        const leftOverSplitAmount: number = totalAmount % PAYOUT_LIMIT;
        while (totalSplits > 0) {
          const payoutItem: AddPayoutPayload = {
            seller_reference: sellerReference,
            currency,
            amount: PAYOUT_LIMIT
          };
          result.push(payoutItem);
          await addItem(payoutItem);
          totalSplits--;
        }
        handleSplitAmount(leftOverSplitAmount,sellerReference,currency);
      } else {
        handleSoldItemsAmountLessThenSplit(itemsArray, sellerReference, currency);
      }
    }
  }
  return result;
};
