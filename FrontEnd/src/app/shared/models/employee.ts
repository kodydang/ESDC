import { Account } from './account';

export class Employee extends Account {
  'id': number;
  'name': string;
  'gender': string;
  'birthday': string;
  'address': string;
  'phone': string;

  constructor(item) {
    super({
      createdBy: item.createdBy,
      createdDate: item.createdDate,
      updatedBy: item.updatedBy,
      updatedDate: item.updatedDate,
      username: item.username,
      password: item.password,
      avatar: item.avatar,
      role: item.role,
    });
    this.id = item.id;
    this.name = item.name;
    this.gender = item.gender;
    this.birthday = item.birthday;
    this.address = item.address;
    this.phone = item.phone;
  }
}
