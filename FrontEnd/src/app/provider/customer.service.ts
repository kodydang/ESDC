import { API } from './../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Customer } from './../shared/models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/customer`)
      .pipe(
        map((body: any) => {
          body.data.forEach((value, index, array) => {
            array[index] = new Customer(value);
            // console.log(value);
            // console.log(array[index]);
          });
          console.log(body);

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
