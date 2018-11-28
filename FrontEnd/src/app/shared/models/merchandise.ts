import { Base } from './base';
import { ProductMapper } from './product-mapper';

export class Merchandise extends Base {
  'id': number;
  'name': string;
  'category': string;
  'price': number;
  'quantity': number;
  'setStoreHaveProduct': ProductMapper[];

  constructor(item) {
    super(item.createdBy, item.createdDate || item['createDay'], item.updatedBy, item.updatedDate);
    this.id = item.id || item['idSanpham'];
    this.name = item.name;
    this.category = item.category;
    this.quantity = item.quantity;
    this.price = item.price;
    const productMappers = item['setStoreHaveProduct'];
    if (productMappers) {
      this.setStoreHaveProduct = productMappers.map(i => new ProductMapper(i));
    }
  }
}
