import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { API } from './../shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Store } from '../shared/models';

@Injectable()
export class StoreService {
  constructor(
    private httpClient: HttpClient,
    private notifyService: NotificationBarService,
  ) {}

  get currentStore() {
    return +sessionStorage.getItem('storeId');
  }

  set currentStore(value) {
    sessionStorage.setItem('storeId', value.toString());
  }

  getAll(): Promise<Store[]> {
    return this.httpClient
      .get(`${API.ROOT}/store`)
      .pipe(
        map(
          (body: any[]) => body['data'].map(i => new Store(i)),
        ),
      ).toPromise()
      .catch(() => this.notifyService.create({
        message: 'Failed to load stores from server.',
        type: NotificationType.Error,
      }));
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
    ).toPromise()
    .catch(() => this.notifyService.create({
      message: 'Failed to update store.',
      type: NotificationType.Error,
    }));
  }

  create(store: Store) {
    return this.httpClient.post(
      `${API.ROOT}/store/create`,
      {
        name: store.name,
        address: store.address,
      },
    ).toPromise()
    .catch(() => this.notifyService.create({
      message: 'Failed to create store.',
      type: NotificationType.Error,
    }));
  }
}
