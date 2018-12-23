import { Account } from './../shared/models/account';
import { API } from '../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../shared/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { StoreService } from './store.service';

@Injectable()
export class EmployeeService {
  constructor(
    private httpClient: HttpClient,
    private storeService: StoreService,
  ) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/employee`)
      .pipe(
        map((body: any) => body['data'].map(i => new Employee(i))),
      ).toPromise();
  }

  getById(id) {
    return this.httpClient.get(`${API.ROOT}/employee/${id}`)
      .pipe(
        map((body: any) => new Employee(body['data'])),
      ).toPromise();
  }

  getByStore(storeId) : Promise<Employee[]> {
    return this.httpClient.get(`${API.ROOT}/store/employee/${storeId}`)
      .pipe(
        map((body: any) => body['data'].map(i => new Employee(i))),
      ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeService.currentStore.id);
  }

  add(employee: Employee, user) {
    const dataObj = {
      name: employee.name,
      bday: employee.birthday.toJSON(),
      phone: employee.phone,
      email: employee.email,
      idStore: this.storeService.currentStore.id,
      userByUserName: {
        nameUser: user.nameUser,
        userPassword: '123456',
      },
    };
    return this.httpClient.post(`${API.ROOT}/employee/create`, dataObj).toPromise();
  }
  addUser(user) {
    const dataObj = {
      nameUser: user.nameUser,
      userPassword: '123456',
      roleName: user.roleName,
      status: 1,
    };
    return this.httpClient.post(`${API.ROOT}/user/create`, dataObj).toPromise();
  }

  update(employee: Employee) {
    const dataObj = {
      name: employee.name,
      bday: employee.birthday.toJSON(),
      phone: employee.phone,
      email: employee.email,
    };
    return this.httpClient.put(`${API.ROOT}/employee/${employee.id}`, dataObj).toPromise();
  }

  changeRole(account: Account, role?: string) {
    return this.httpClient.put(
      `${API.ROOT}/user/role/${account.username}`,
      { role: role || account.roleKey },
    ).toPromise();
  }

  delete(id) {
    return this.httpClient.get(`${API.ROOT}/employee/delete/${id}`).toPromise();
  }
}
