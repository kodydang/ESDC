import { API } from './../shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Store } from '../shared/models';

@Injectable()
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  get currentStore() {
    return new Store({
      idCuahang: sessionStorage.getItem('storeId'),
    });
  }

  getAll(): Promise<Store[]> {
    return this.httpClient
      .get(`${API.ROOT}/store`)
      .pipe(
        map(
          (body: any[]) => body['data'].map(i => new Store(i)),
        ),
      ).toPromise();
  }

  getById(id: string) {

  }

  update(store: Store) {
    return this.httpClient.put(
      `${API.ROOT}/store/update/${store.id}`,
      {
        idCuahang: store.id,
        rootId: null,
        name: store.name,
        address: store.address,
      },
    ).toPromise();
  }
}
