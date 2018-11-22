import { Injectable } from '@angular/core';
import { Account } from '../shared/models/account';
import { ROLE } from '../shared/constants';

@Injectable()
export class AuthenticationService {
  private credential : Account = new Account({
    username: 'vinh',
    password: '1',
    role: 'super_admin',
  });

  get currentAccount() {
    return this.credential;
  }

  constructor() { }

  havePermission(level: number) {
    const key = Object.keys(ROLE).find(i => ROLE[i].KEY === this.credential.roleKey);
    if (!key) {
      return false;
    }

    return ROLE[key].LEVEL >= level;
  }
}
