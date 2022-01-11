import { Pool } from 'pg';
import {
  AddSoldItemPayload,
  SoldItemEntity,
  UpdateSoldItemPayload
} from '../models/soldItemModel';

const pool = new Pool();

export const getAllISoldItemsFromDB = async () => {
  const { rows: soldItemEntities } = await pool.query<SoldItemEntity>(
    'SELECT * FROM sold_item'
  );
  return soldItemEntities;
};

export const getSoldItemFromDB = async (id: number) => {
  const {
    rows: [soldItemEntity]
  } = await pool.query<SoldItemEntity>(
    'SELECT * FROM sold_item WHERE id = $1',
    [id]
  );
  return soldItemEntity;
};

export const addListOfSoldItems = async (soldItems: [AddSoldItemPayload]) => {
  const rows = [];
  console.log(' soldItems ',soldItems)
  for(const element of soldItems){
    const r = await pool.query<SoldItemEntity>(
      `insert into sold_item(item_id, no_of_items, seller_reference) values($1, $2, $3) returning *`,
      [element.item_id, element.no_of_items, element.seller_reference]
    );
    rows.push(r);
  };

  return rows;
};

export const updateSoldItemInDB = async ({
  id,
  item_id = null,
  no_of_items = null,
  seller_reference = null
}: UpdateSoldItemPayload) => {
  const {
    rows: [itemEntity]
  } = await pool.query<SoldItemEntity>(
    `update sold_item set item_id=coalesce($1, item_id), no_of_items=coalesce($2, no_of_items), seller_reference=coalesce($3, seller_reference) where id=$4 returning *`,
    [item_id, no_of_items, seller_reference, id]
  );
  return itemEntity;
};

export const deleteAllSoldItemsFromDB = async () => {
  const { rows: soldItemEntities } = await pool.query('DELETE FROM sold_item');
  return soldItemEntities;
};

export const deleteSoldItemFromDB = async (id: number) => {
  return pool.query<SoldItemEntity>('DELETE FROM sold_item where id = $1', [
    id
  ]);
};
