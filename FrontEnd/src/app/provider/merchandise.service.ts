import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Merchandise } from '../shared/models';

const API_URL = './../../assets/data-json/list-merchandise.json';
const API_CATEGORY = './../../assets/data-json/list-category.json';
@Injectable()
export class MerchandiseService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API_URL}`)
      .pipe(
        map((body: any[]) => {
          body.forEach((value, index, array) => {
            array[index] = new Merchandise(value);
            // console.log(value);
            // console.log(array[index]);
          });
          return body;
        },
            catchError(() => of('Error, could not load joke :-(')),
        ),
      );
  }

  getCategory() {
    return this.httpClient.get(`${API_CATEGORY}`)
      .pipe(
        map((body: any[]) => {
          return body;
        },
            catchError(() => of('Error, could not load joke :-(')),
        ),
      );
  }
}
