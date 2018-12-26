import { Base } from './base';

export class Merchandise extends Base {
  'id': number;
  'name': string;
  'category': string;
  'categoryId': string;
  'price': number;
  'quantity': number;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.id || item['idSanpham'];
    this.name = item.name;
    this.categoryId = item.categoryId;
    this.category = item.category;
    this.quantity = item.quantity;
    this.price = item.price;
  }
}
