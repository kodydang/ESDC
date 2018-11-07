import { Base } from './base';

export class Merchandise extends Base {
  'id': number;
  'name': string;
  'category': string;
  'price': number;
  'quantity': number;

  constructor(item) {
    super(item.createdBy, item.createdDate, item.updatedBy, item.updatedDate);
    this.id = item.id;
    this.name = item.name;
    this.category = item.category;
    this.quantity = item.quantity;
    this.price = item.price;
  }
}
