import { API } from './../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Category } from './../shared/models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../shared/models';
import { of } from 'rxjs';

@Injectable()
export class MerchandiseService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API.BYPASS}${API.ROOT}/product`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Merchandise(i)),
          catchError(() => of('Error, could not load product from server')),
        ),
      );
  }

  getCategory() {
    return this.httpClient.get(`${API.BYPASS}${API.ROOT}/category`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Category(i)),
          catchError(() => of('Error, could not load category from server')),
        ),
      );
  }
}
