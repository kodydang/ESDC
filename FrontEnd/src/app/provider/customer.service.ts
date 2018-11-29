import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from '../shared/models';
import { API } from '../shared/constants';

@Injectable()
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/customer`)
      .pipe(
        map(
          (body: any) => {
            body.data.forEach((value, index, array) => {
              array[index] = new Customer(value);
              // console.log(value);
              // console.log(array[index]);
            });
            return body;
          },
          catchError(() => of('Error, could not load joke :-(')),
        ),
      );
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

  update(customer: Customer) {
    const dataObj = {
      idKhachhang: customer.id,
      name: customer.name,
      birthDay: customer.birthday.toJSON(),
      phone: customer.phone,
      email: customer.email,
      createDay: customer.createdDate.toJSON(),
    };
    return this.httpClient.put(`${API.ROOT}/customer/update/${customer.id}`, dataObj).toPromise();
  }

  delete(id) {
    return this.httpClient.get(`${API.ROOT}/customer/delete/${id}`).toPromise();
  }

  create(customer: Customer) {
    return this.httpClient.post(
      `${API.ROOT}/customer/create`,
      {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        birthDay: customer.birthday,
      },
    ).toPromise();
  }
}
