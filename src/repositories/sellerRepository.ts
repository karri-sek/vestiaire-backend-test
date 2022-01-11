import { Pool } from 'pg';
import {
  AddSellerPayload,
  SellerEntity,
  UpdateSellerPayload
} from '../models/sellerModel';

const pool = new Pool();

export const getAllSellerFromDB = async () => {
  const { rows: sellerEntities } = await pool.query<SellerEntity>(
    'SELECT * FROM seller'
  );
  return sellerEntities;
};

export const getSellerFromDB = async (id: number) => {
  const {
    rows: [sellerEntity]
  } = await pool.query<SellerEntity>('SELECT * FROM seller WHERE id = $1', [
    id
  ]);
  return sellerEntity;
};

export const addSellerToDB = async ({
  seller_reference,
  seller_location = ''
}: AddSellerPayload) => {
  const {
    rows: [sellerEntity]
  } = await pool.query<SellerEntity>(
    `insert into seller(seller_location, seller_reference) values($1, $2) returning *`,
    [seller_location, seller_reference]
  );
  return sellerEntity;
};

export const updateSellerInDB = async ({
  id,
  seller_location,
  seller_reference
}: UpdateSellerPayload) => {
  const {
    rows: [sellerEntity]
  } = await pool.query<SellerEntity>(
    `update seller set seller_location=coalesce($1, seller_location), seller_reference=coalesce($2, seller_reference) where id=$3 returning *`,
    [seller_location, seller_reference, id]
  );
  return sellerEntity;
};

export const deleteAllSellersFromDB = async () => {
  const { rows: sellerEntities } = await pool.query('DELETE FROM seller');
  return sellerEntities;
};

export const deleteSellerFromDB = async (id: number) => {
  return pool.query<SellerEntity>('DELETE FROM seller where id = $1', [id]);
};
