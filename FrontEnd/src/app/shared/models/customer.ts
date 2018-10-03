import { Base } from './base';

export class Customer extends Base {
  'id': number;
  'name': string;
  'birthday': string;
  'address': string;
  'phone': string;

  constructor(item) {
    super(item.createdBy, item.createdDate, item.updatedBy, item.updatedDate);
    this.id = item.id;
    this.name = item.name;
    this.birthday = item.birthday;
    this.address = item.address;
    this.phone = item.phone;
  }
}
