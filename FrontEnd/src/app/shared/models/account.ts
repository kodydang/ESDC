import { ROLE } from 'src/app/shared/constants';
import { Base } from './base';

export class Account extends Base {
  'username': string;
  'password': string;
  'photo': string;
  'roleKey': string;

  constructor(item) {
    super(item.createdBy, item.createdDate || item['createDay'], item.updatedBy, item.updatedDate);
    this.username = item.username || item['nameUser'];
    this.password = item.password || item['userPassword'];
    this.photo = item.photo;
    this.roleKey = item.role || item['roleName'];
  }

  get role() {
    let role = '';
    Object.keys(ROLE).forEach((i) => {
      if (ROLE[i].KEY === this.roleKey) {
        return role = ROLE[i].TITLE;
      }
    });
    return role;
  }
}
