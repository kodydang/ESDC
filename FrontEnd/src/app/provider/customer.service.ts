import { API } from './../shared/constants';
import { Customer } from './../shared/models/customer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = './../../assets/data-json/list-customer.json';
@Injectable()
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API_URL}`)
      .pipe(
        map((body: any[]) => {
          body.forEach((value, index, array) => {
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
