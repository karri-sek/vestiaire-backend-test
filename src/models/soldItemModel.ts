type Timestamp = string;

export type SoldItemEntity = {
  id: number;
  item_id: string;
  no_of_items: number;
  seller_reference: string;
  updated_at: Timestamp;
};

export type AddSoldItemPayload = {
  item_id: string;
  no_of_items: number;
  seller_reference: string;
};

export type UpdateSoldItemPayload = {
  id: number;
  item_id: string;
  no_of_items: string;
  seller_reference: string;
};
