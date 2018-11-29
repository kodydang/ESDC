import { API } from './../shared/constants';
import { catchError, map } from 'rxjs/operators';
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

  getByStore(storeId): Promise<Merchandise[]> {
    return this.httpClient.get(`${API.ROOT}/store/product/${storeId}`).pipe(
      map(res => res['data'].map(i => new Merchandise(i))),
      catchError((err) => {
        console.error('Error, could not load product from server', err);
        return null;
      }),
    ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeService.currentStore.id);
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
    return this.addToStore(items, this.storeService.currentStore.id);
  }

  update(items: Merchandise[]) {
    return this.httpClient.post(
      `${API.ROOT}/product/update`,
      items.map(i => ({
        ...i,
        idSanpham: i.id,
        createDay: i.createdDate,
        sellQuantities: 0,
      })),
    ).toPromise();
  }
}
