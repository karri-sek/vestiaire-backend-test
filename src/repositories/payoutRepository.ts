import { Pool } from 'pg';
import { AddPayoutPayload, PayoutEntity } from '../models/payoutModel';

export const pool = new Pool();

export const getAllPayoutsFromDB = async () =>
  await pool.query<PayoutEntity>('SELECT * FROM payout');

export const getPayoutFromDB = async (id: number) => {
  const {
    rows: [entity]
  } = await pool.query<PayoutEntity>(
    `SELECT * FROM payout WHERE payout.id = $1`,
    [id]
  );
  return entity;
};

export const getAllPayoutItems = async () => {
  const { rows: payoutEntities } = await pool.query<PayoutEntity>(
    'SELECT * FROM payout'
  );
  return payoutEntities;
};

export const addPayoutToDB = async ({
  seller_reference,
  amount,
  currency
}: AddPayoutPayload) => {
  const {
    rows: [payoutEntity]
  } = await pool.query<PayoutEntity>(
    `insert into payout(seller_reference, amount, currency) values($1, $2, $3) returning *`,
    [seller_reference, amount, currency]
  );
  return payoutEntity;
};

export const removePayoutFromDB = async (id: number) => {
  const {
    rows: [payoutEntity]
  } = await pool.query<PayoutEntity>(
    `delete from payout WHERE payout.id = $1`,
    [id]
  );
  return payoutEntity;
};
