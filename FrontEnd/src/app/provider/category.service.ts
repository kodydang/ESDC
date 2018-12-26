import { API } from '../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../shared/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { of } from 'rxjs';
import { StoreService } from './store.service';

@Injectable()
export class CategoryService {
  constructor(
    private httpClient: HttpClient,
    private storeSerice: StoreService,
    private notifyService: NotificationBarService,
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
      ).toPromise()
      .catch(() => this.notifyService.create({
        message: 'Failed to load category from server.',
        type: NotificationType.Error,
      }));
  }

  getByStore(storeId): Promise<Category[]> {
    return this.httpClient.get(`${API.ROOT}/store/category/${storeId}`)
      .pipe(
        map((body: any) => body['data'].map(i => new Category(i)),
      ),
      ).toPromise()
      .catch(() => this.notifyService.create({
        message: 'Failed to load category from server.',
        type: NotificationType.Error,
      }));
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeSerice.currentStore);
  }

  add(category) {
    const obj = {
      name: category.name,
      idStore: this.storeSerice.currentStore,
    };
    return this.httpClient.post(`${API.ROOT}/category/create`, obj)
      .toPromise()
      .catch(() => this.notifyService.create({
        message: 'Failed to create category.',
        type: NotificationType.Error,
      }));
  }

  update(id, newNameCategory) {
    const obj = {
      name: newNameCategory,
      idStore: this.storeSerice.currentStore,
    };
    return this.httpClient.put(`${API.ROOT}/category/${id}`, obj)
      .toPromise()
      .catch(() => this.notifyService.create({
        message: 'Failed to update category.',
        type: NotificationType.Error,
      }));
  }

  delete(id) {
    return this.httpClient.delete(`${API.ROOT}/category/${id}`).toPromise();
  }
}
