import { Base } from './base';

export class Account extends Base {
  'username': string;
  'password': string;
  'photo': string;
  'role': number;

  constructor(item) {
    super(item.createdBy, item.createdDate, item.updatedBy, item.updatedDate);
    this.username = item.username;
    this.password = item.password;
    this.photo = item.photo;
    this.role = item.role;
  }
}
