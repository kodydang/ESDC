import { API } from './../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Category } from './../shared/models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../shared/models';
import { of, forkJoin } from 'rxjs';
import { StoreService } from './store.service';

@Injectable()
export class MerchandiseService {
  constructor(private httpClient: HttpClient, private storeService: StoreService) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/product`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Merchandise(i)),
          catchError(() => of('Error, could not load product from server')),
        ),
      );
  }

  getProductsByStore(storeId) {
    const obs = [
      this.getAll(),
      this.httpClient.get(`${API.ROOT}/store/product/${storeId}`),
    ];

    return forkJoin(obs).pipe(
      map(
        (res) => {
          const all: Merchandise[] = res[0];
          const mapper: any[] = res[1]['data'].map(i => i['id']);
          return all.filter(i => mapper.find(x => x.productId === i.id && x.storeId === storeId));
        },
      ),
      catchError((err) => {
        console.error('Error, could not load product from server', err);
        return null;
      }),
    );
  }

  getProductsOfCurrentStore() {
    return this.getProductsByStore(this.storeService.currentStore.id);
  }

  getCategory() {
    return this.httpClient.get(`${API.ROOT}/category`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Category(i)),
          catchError(() => of('Error, could not load category from server')),
        ),
      );
  }

  addProductToStore(items: Merchandise[], storeId) {
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

  addProductToCurrentStore(items: Merchandise[]) {
    return this.addProductToStore(items, this.storeService.currentStore.id);
  }

  updateProduct(productId, storeId) {

  }
}
