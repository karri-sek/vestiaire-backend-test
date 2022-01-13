import { mapSoldItemsToTheSeller } from './soldItemService';

describe('soldItemsService', () => {
  afterAll(async () => {});
  it('creates map with two sold items', async () => {
    const soldItems = [
      { item_name: 'mac-pro', no_of_items: 5, seller_reference: 'Amazon' },
      { item_name: 'iphone', no_of_items: 10, seller_reference: 'Amazon' }
    ];
    const returnedMap =  await mapSoldItemsToTheSeller(soldItems);
    const amazonItem = returnedMap.get('Amazon');
    expect(amazonItem.length).toBe(2)
  });
  it('creates map with three sold items', async () => {
    const soldItems = [
      { item_name: 'mac-pro', no_of_items: 5, seller_reference: 'Amazon' },
      { item_name: 'digicam', no_of_items: 15, seller_reference: 'Amazon' },
      { item_name: 'iphone', no_of_items: 5, seller_reference: 'ebay' },
    ];
    const returnedMap =  await mapSoldItemsToTheSeller(soldItems);
    const amazonItem = returnedMap.get('Amazon');
    expect(amazonItem.length).toBe(2);
    expect(amazonItem[0].totalAmount).toBe(9500);

    const ebay = returnedMap.get('ebay');
    expect(ebay.length).toBe(1);
    expect(ebay[0].totalAmount).toBe(5000);

  });
});
