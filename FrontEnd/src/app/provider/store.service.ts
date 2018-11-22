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
      idCuahang: 2,
    });
  }

  getAll(): Observable<Store[]> {
    return this.httpClient
      .get(`${API.BYPASS}${API.ROOT}/store`)
      .pipe(
        tap(
          (body: any) => console.log(body.data),
        ),
        map(
          (body: any[]) => body['data'].map(i => new Store(i)),
          catchError(() => of('Error, could not load store list')),
        ),
      );
  }

  getById(id: string) {

  }
}
