import { Injectable } from '@angular/core';
import { Account } from '../shared/models/account';
import { ROLE } from '../shared/constants';

@Injectable()
export class AuthenticationService {
  private credential: Account = new Account({
    username: sessionStorage.getItem('username'),
    password: '',
    role: sessionStorage.getItem('role'),
    id: +sessionStorage.getItem('employeeId'),
  });

  get currentAccount() {
    return this.credential;
  }

  set currentAccount(value) {
    sessionStorage.setItem('username', value.username);
    sessionStorage.setItem('role', value.roleKey);
    sessionStorage.setItem('employeeId', value.id.toString());
    this.credential = new Account({
      username: value.username,
      role: value.roleKey,
      id: +value.id,
    });
  }

  constructor() {}

  havePermission(level: number) {
    const key = Object.keys(ROLE).find(
      i => ROLE[i].KEY === this.credential.roleKey,
    );
    if (!key) {
      return false;
    }

    return ROLE[key].LEVEL >= level;
  }
}
