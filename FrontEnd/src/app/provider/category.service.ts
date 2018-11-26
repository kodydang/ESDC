import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../shared/models';
import { API } from '../shared/constants';

@Injectable()
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/category`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Category(i)),
          catchError(() => of('Error, could not load category from server')),
        ),
      );
  }

  add(category) {
    return this.httpClient.post(`${API.ROOT}/category/create/`, category)
      .pipe(
          catchError(() => of('Error, could not add category')),
      );
  }

  update(id, newNameCategory) {
    return this.httpClient.put(`${API.ROOT}/category/${id}`, newNameCategory)
      .pipe(
          catchError(() => of('Error, could not update category')),
      );
  }
}
