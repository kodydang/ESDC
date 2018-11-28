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
}
