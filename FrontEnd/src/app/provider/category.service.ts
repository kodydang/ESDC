import { API } from '../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../shared/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { StoreService } from './store.service';

@Injectable()
export class CategoryService {
  constructor(
    private httpClient: HttpClient,
    private storeSerice: StoreService,
  ) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/category`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Category(i)),
          catchError(() => of('Error, could not load category from server')),
        ),
      );
  }

  getById(id) {
    return this.httpClient.get(`${API.ROOT}/category/${id}`)
      .pipe(
        map((body: any) => new Category(body['data'])),
      ).toPromise();
  }

  getByStore(storeId): Promise<Category[]> {
    return this.httpClient.get(`${API.ROOT}/store/category/${storeId}`)
      .pipe(
        map((body: any) => body['data'].map(i => new Category(i)),
      ),
      ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeSerice.currentStore);
  }

  add(category) {
    const obj = {
      name: category.name,
      idStore: this.storeSerice.currentStore,
    };
    return this.httpClient.post(`${API.ROOT}/category/create`, obj).toPromise();
  }

  update(id, newNameCategory) {
    const obj = {
      name: newNameCategory,
      idStore: this.storeSerice.currentStore,
    };
    return this.httpClient.put(`${API.ROOT}/category/${id}`, obj).toPromise();
  }

  delete(id) {
    return this.httpClient.delete(`${API.ROOT}/category/${id}`).toPromise();
  }
}
