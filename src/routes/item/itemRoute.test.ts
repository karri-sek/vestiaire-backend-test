import supertest from 'supertest';
import { app } from '../../app';
import { pool } from '../../repositories/payoutRepository';

const server = supertest(app);

describe('items', () => {
  afterAll(async () => {
    await pool.end();
  });
  it('creates new item', () =>
    server
      .post('/items')
      .send({
        item_name: 'hard-disk66',
        price_currency: 'USD',
        price_amount: 200
      })
      .expect(({ body }) =>
        expect(body).toMatchObject({
          item_name: 'hard-disk',
          price_currency: 'USD',
          price_amount: 200,
          updated_at: expect.anything()
        })
      ));
});
