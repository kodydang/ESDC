import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '../shared/models';

const API_URL = './../../assets/data-json/list-store.json';
@Injectable()
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get(`${API_URL}`)
      .pipe(
        map(
          (body: any[]) => body.map(i => new Store(i)),
          catchError(() => of('Error, could not load store list'))
        ),
      );
  }
}
