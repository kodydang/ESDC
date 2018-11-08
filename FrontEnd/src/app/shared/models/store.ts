import { Base } from './base';

export class Store extends Base {
  'id': number;
  'name': string;
  'address': string;
  'logo': string;
  'owner': string;

  constructor(item) {
    super(item.createdBy, item.createdDate, item.updatedBy, item.updatedDate);
    this.id = item.id;
    this.name = item.name;
    this.address = item.address;
    this.logo = item.logo;
    this.owner = item.owner;
  }
}
