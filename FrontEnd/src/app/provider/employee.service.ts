import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '../shared/models';
import { API } from '../shared/constants';

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/employee`)
      .pipe(
        map((body: any) => {
          body.data.forEach((value, index, array) => {
            array[index] = new Employee(value);
            // console.log(value);
            // console.log(array[index]);
          });
          return body;
        },
            catchError(() => of('Error, could not load joke :-(')),
        ),
      );
  }
}
