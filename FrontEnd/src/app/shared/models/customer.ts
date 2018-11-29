import { Base } from './base';

export class Customer extends Base {
  map(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  'id': number;
  'name': string;
  'gender': string;
  'birthday': Date;
  'address': string;
  'phone': string;
  'email': string;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.idKhachhang;
    this.name = item.name;
    this.gender = item.gender || '';
    this.birthday = new Date(item.birthDay || item.birthday);
    this.address = item.address || '';
    this.phone = item.phone;
    this.email = item.email;
  }
}
