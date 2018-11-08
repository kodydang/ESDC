import { Base } from './base';

export class Account extends Base {
  'username': string;
  'password': string;
  'avatar': string;
  'role': number;

  constructor(item) {
    super(item.createdBy, item.createdDate, item.updatedBy, item.updatedDate);
    this.username = item.username;
    this.password = item.password;
    this.avatar = item.avatar;
    this.role = item.role;
  }
}
