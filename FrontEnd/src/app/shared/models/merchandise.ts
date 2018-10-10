import { Base } from './base';

export class Merchandise extends Base {
  'id': number;
  'name': string;
  'category': string;
  'price': number;
  'quantities': number;

  constructor(item) {
    super(item.createdBy, item.createdDate, item.updatedBy, item.updatedDate);
    this.id = item.id;
    this.name = item.name;
    this.category = item.category;
    this.quantities = item.quantities;
    this.price = item.price;
  }
}
