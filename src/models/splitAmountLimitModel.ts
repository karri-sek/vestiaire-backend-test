type Timestamp = string;

export type SplitAmountLimtEntity = {
  id: number;
  item_name: string;
  price_currency: string;
  price_amount: number;
  updated_at: Timestamp;
};

export type AddItemPayload = {
  item_name: string;
  price_currency: string;
  price_amount: number;
};

export type UpdateItemPayload = {
  id: number;
  item_name: string;
  price_currency: string;
  price_amount: number;
};
