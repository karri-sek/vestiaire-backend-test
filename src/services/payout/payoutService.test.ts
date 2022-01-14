import { calculatePayouts } from './payoutService';

describe('soldItemsService', () => {
  afterAll(async () => {});
  it('if the given seller reference has only item irrespective of total amount it should return only one payout record', async () => {
    const soldItemsMap = new Map();
    soldItemsMap.set('ebay', [
      {
        item: {
          id: 2,
          item_name: 'iphone',
          price_currency: 'USD',
          price_amount: 1000
        },
        totalAmount: 5000
      }
    ]);

    const returnedMap = await calculatePayouts(soldItemsMap);
    const returnedResult = [
      { seller_reference: 'ebay', currency: 'USD', amount: 5000 }
    ];
    expect(returnedMap).toStrictEqual(returnedResult);
  });
  it('given there are multiple items for single seller reference and total Amount greater then limit it should split the payouts', async () => {
    const soldItemsMap = new Map();
    soldItemsMap.set('ebay', [
      {
        item: {
          id: 1,
          item_name: 'mac-pro',
          price_currency: 'USD',
          price_amount: 1900
        },
        totalAmount: 9500
      },
      {
        item: {
          id: 9,
          item_name: 'digicam',
          price_currency: 'USD',
          price_amount: 900
        },
        totalAmount: 13500
      }
    ]);
    const result = await calculatePayouts(soldItemsMap);
    expect(result.length).toBe(23);
  });

  it('multiple items with multiple sellers should return multiple payouts', async () => {
    const soldItemsMap = new Map();
    soldItemsMap.set('ebay', [
      {
        item: {
          id: 1,
          item_name: 'mac-pro',
          price_currency: 'USD',
          price_amount: 1900
        },
        totalAmount: 9500
      },
      {
        item: {
          id: 9,
          item_name: 'digicam',
          price_currency: 'USD',
          price_amount: 900
        },
        totalAmount: 13500
      }
    ]);
    soldItemsMap.set('amazon', [
        {
          item: {
            id: 1,
            item_name: 'mac-pro',
            price_currency: 'USD',
            price_amount: 1900
          },
          totalAmount: 9500
        },
        {
          item: {
            id: 9,
            item_name: 'digicam',
            price_currency: 'USD',
            price_amount: 900
          },
          totalAmount: 13500
        }
      ]);
    const result = await calculatePayouts(soldItemsMap);
    expect(result.length).toBe(46);
  });
});

