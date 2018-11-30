import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from '../shared/models';
import { API } from '../shared/constants';
import { StoreService } from './store.service';

@Injectable()
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private storeService: StoreService,
  ) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/customer`)
      .pipe(
        map((body: any) => body.data.map(i => new Customer(i))),
        catchError(() => of('Error, could not load joke :-(')),
      ).toPromise();
  }

  getByStore(storeId): Promise<Customer[]> {
    return this.httpClient.get(`${API.ROOT}/store/list-customer/${storeId}`)
      .pipe(
        map((body: any) => body.map(i => new Customer(i))),
      ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeService.currentStore.id);
  }

  add(customer: Customer) {
    const dataObj = {
      name: customer.name,
      birthDay: customer.birthday.toJSON(),
      phone: customer.phone,
      email: customer.email,
    };
    return this.httpClient.post(`${API.ROOT}/customer/create`, dataObj).toPromise();
  }

  delete(id) {
    return this.httpClient.delete(`${API.ROOT}/customer/delete/${id}`).toPromise();
  }

  create(customer: Customer) {
    return this.httpClient.post(
      `${API.ROOT}/customer/create`,
      {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        birthDay: customer.birthday,
        idStore: this.storeService.currentStore.id,
      },
    ).toPromise();
  }

  async update(customer: Customer) {
    const res = await this.getFromCurrentStore();
    const found = res.find(i => i.email.toLowerCase() === customer.email.toLowerCase());
    if (found) {
      return this.httpClient.put(`${API.ROOT}/customer/update/${found.id}`, {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        birthDay: customer.birthday,
        idStore: this.storeService.currentStore.id,
        idKhachhang: found.id,
      }).toPromise();
    }
    return this.create(customer);
  }
}
