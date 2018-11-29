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
    return this.httpClient.get(`${API.ROOT}/employee/`)
      .pipe(
        map((body: any) => {
          body.data.forEach((value, index, array) => {
            array[index] = new Employee(value);
          });
          return body;
        },
            catchError(() => of('Error, could not load joke :-(')),
        ),
      );
  }

  add(employee: Employee) {
    const dataObj = {
      name: employee.name,
      birthDay: employee.birthday.toJSON(),
      phone: employee.phone,
    };
    return this.httpClient.post(`${API.ROOT}/employee/create`, dataObj).toPromise();
  }

  update(employee: Employee) {
    const dataObj = {
      idKhachhang: employee.id,
      name: employee.name,
      birthDay: employee.birthday.toJSON(),
      phone: employee.phone,
      createDay: employee.createdDate.toJSON(),
    };
    return this.httpClient.put(`${API.ROOT}/employee/update/${employee.id}`, dataObj).toPromise();
  }

  delete(id) {
    return this.httpClient.get(`${API.ROOT}/employee/delete/${id}`).toPromise();
  }
}
