import { Pool } from 'pg';
import {
  AddItemPayload,
  ItemEntity,
  UpdateItemPayload
} from '../models/itemModel';

const pool = new Pool();

export const getAllItemsFromDB = async () => {
  const { rows: itemEntities } = await pool.query<ItemEntity>(
    'SELECT * FROM item'
  );
  return itemEntities;
};

export const getItemFromDB = async (id: number) => {
  const {
    rows: [itemEntity]
  } = await pool.query<ItemEntity>('SELECT * FROM item WHERE id = $1', [id]);
  return itemEntity;
};

export const addItemToDB = async ({
  item_name,
  price_currency = '',
  price_amount = 0.0
}: AddItemPayload) => {
  const {
    rows: [taskEntity]
  } = await pool.query<ItemEntity>(
    `insert into item(item_name, price_currency, price_amount) values($1, $2, $3) returning *`,
    [item_name, price_currency, price_amount]
  );
  return taskEntity;
};

export const updateItemInDB = async ({
  id,
  item_name = null,
  price_currency = null,
  price_amount
}: UpdateItemPayload) => {
  const {
    rows: [itemEntity]
  } = await pool.query<ItemEntity>(
    `update item set item_name=coalesce($1, item_name), price_currency=coalesce($2, price_currency),  price_amount=coalesce($3, price_amount), where id=$4 returning *`,
    [item_name, price_currency, price_amount, id]
  );
  return itemEntity;
};

export const deleteAllItemsFromDB = async () => {
  const { rows: itemEntities } = await pool.query('DELETE FROM item');
  return itemEntities;
};

export const deleteItemFromDB = async (id: number) => {
  return pool.query<ItemEntity>('DELETE FROM item where id = $1', [id]);
};
