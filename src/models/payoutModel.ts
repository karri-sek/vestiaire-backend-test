export type PayoutEntity = {
  id: number;
  seller_reference: string;
  amount: number;
  currency: string;
};

export type AddPayoutPayload = {
  seller_reference: string;
  amount: number;
  currency: string;
};

export type UpdatePayoutPayload = {
  id: number;
  seller_reference: string;
  amount: string;
  currency: number;
};
