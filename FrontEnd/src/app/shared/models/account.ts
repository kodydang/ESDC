import { ROLE } from 'src/app/shared/constants';
import { Base } from './base';

export class Account extends Base {
  'username': string;
  'password': string;
  'photo': string;
  'roleKey': string;
  'id': number;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.username = item.username || item['nameUser'];
    this.password = item.password || item['userPassword'];
    this.photo = item.photo;
    this.roleKey = item.role || item['roleName'];
    this.id = item.id;
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

  get isEmployee() {
    return this.roleKey === ROLE.STAFF.KEY;
  }

  get isOwner() {
    return this.roleKey === ROLE.OWNER.KEY;
  }

  get isManager() {
    return this.roleKey === ROLE.MANAGER.KEY;
  }

  get isSuperAdmin() {
    return this.roleKey === ROLE.SUPER_ADMIN.KEY;
  }
}
