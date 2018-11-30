import { Account } from './account';

export class Employee extends Account {
  'id': number;
  'name': string;
  // 'gender': string;
  'birthday': Date;
  'email': string;
  'phone': string;
  'user': any;
  'idStore': number;
  'status': string;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.idNv || -1;
    this.name = item.name || '';
    // this.gender = item.gender || '';
    this.birthday = new Date(item.bday);
    this.email = item.email || '';
    this.phone = item.phone || '';
    this.user = item.userByUserName || {};
    this.idStore = item.idStore || -1;
    this.status = item.status || 0;
  }
}
