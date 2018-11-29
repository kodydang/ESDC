import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../shared/models';
import { StoreService } from './store.service';
import { API } from '../shared/constants';

const API_URL = './../../assets/data-json/list-category.json';
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

  getByStore(storeId): Promise<Category[]> {
    return this.httpClient.get(`${API.ROOT}/store/category/${storeId}`)
      .pipe(
        map((body: any) => body['data'].map(i => new Category(i)),
      ),
      ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeSerice.currentStore.id);
  }
}
