import { Account } from './account';

export class Employee extends Account {
  'id': number;
  'name': string;
  'gender': string;
  'birthday': Date;
  'address': string;
  'phone': string;

  constructor(item) {
    super(item['userByUserName']);
    this.id = item.id || item['idNv'];
    this.name = item.name;
    this.gender = item.gender;
    this.birthday = new Date(item.birthday || item['bday']);
    this.address = item.address;
    this.phone = item.phone;
  }
}
