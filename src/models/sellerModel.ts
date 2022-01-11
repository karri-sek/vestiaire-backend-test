type Timestamp = string;

export type SellerEntity = {
  id: number;
  seller_location: string;
  seller_reference: string;
  updated_at: Timestamp;
};

export type AddSellerPayload = {
  seller_location: string;
  seller_reference: string;
};

export type UpdateSellerPayload = {
  id: number;
  seller_location: string;
  seller_reference: string;
};
