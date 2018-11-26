export class ProductMapper {
  'id': {
    'storeId': number,
    'productId': number,
  };
  'quantities': number;

  constructor(item?) {
    if (item) {
      this.id = item.id;
      this.quantities = item.quantities;
    }
  }
}
