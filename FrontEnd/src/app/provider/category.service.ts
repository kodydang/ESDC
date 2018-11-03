import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../shared/models';

const API_URL = './../../assets/data-json/list-category.json';
@Injectable()
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API_URL}`)
      .pipe(
        map((body: any[]) => {
          body.forEach((value, index, array) => {
            array[index] = new Category(value);
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
