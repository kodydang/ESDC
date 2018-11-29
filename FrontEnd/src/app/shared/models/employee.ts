import { Account } from './account';

export class Employee extends Account {
  'id': number;
  'name': string;
  'gender': string;
  'birthday': Date;
  'address': string;
  'phone': string;
  'user': any;
  'idStore': number;

  constructor(item) {
    super(item.createDay || new Date().toJSON());
    this.id = item.idNv || -1;
    this.name = item.name || '';
    this.gender = item.gender || '';
    this.birthday = new Date(item.bday);
    this.address = item.address || '';
    this.phone = item.phone || '';
    this.user = item.userByUserName || {};
    this.idStore = item.idStore || -1;
  }
}
