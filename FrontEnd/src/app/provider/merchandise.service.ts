import { Category } from './../shared/models/category';
import { CategoryService } from './category.service';
import { API } from './../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../shared/models';
import { of, forkJoin } from 'rxjs';
import { StoreService } from './store.service';

@Injectable()
export class MerchandiseService {
  constructor(
    private httpClient: HttpClient,
    private storeService: StoreService,
    private categoryService: CategoryService,
  ) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/product`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Merchandise(i)),
          catchError(() => of('Error, could not load product from server')),
        ),
      ).toPromise();
  }

  getByStore(storeId): Promise<Merchandise[]> {
    const observers = [
      this.categoryService.getFromCurrentStore(),
      this.httpClient.get(`${API.ROOT}/store/product/${storeId}`),
    ];

    return forkJoin(observers).pipe(
      map((res) => {
        const categories: any = res[0];
        const products = res[1]['data'].map((i) => {
          const category = categories.find(x => x.id === i.category);
          return new Merchandise({
            ...i,
            categoryId: i.category,
            category: category ? category.name : 'Unclassified',
          });
        });
        return products;
      }),
      // catchError((err) => {
      //   console.error('Error, could not load product from server', err);
      //   return null;
      // }),
    ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeService.currentStore);
  }

  addToStore(items: Merchandise[], storeId) {
    return forkJoin(
      items.map(i => this.httpClient.post(
        `${API.ROOT}/product/goodsrecept/`,
        {
          storeId,
          productId: i.id,
          quantity: i.quantity,
        },
      )),
    ).toPromise();
  }

  addToCurrentStore(items: Merchandise[]) {
    return this.addToStore(items, this.storeService.currentStore);
  }

  update(items: Merchandise[]) {
    return forkJoin(
      items.map(i => this.httpClient.put(
        `${API.ROOT}/product/${i.id}`,
        {
          name: i.name,
          category: i.categoryId,
          quantity: i.quantity,
          price: i.price,
        },
      )),
    ).toPromise();
  }
}
