import { API } from '../shared/constants';
import { catchError, map } from 'rxjs/operators';
import { Bill } from '../shared/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { StoreService } from './store.service';

@Injectable()
export class BillService {
  constructor(
    private httpClient: HttpClient,
    private storeSerice: StoreService,
  ) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/bill`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Bill(i)),
          catchError(() => of('Error, could not load bill from server')),
        ),
      );
  }

  getById(id) {
    return this.httpClient.get(`${API.ROOT}/bill/${id}`)
      .pipe(
        map((body: any) => new Bill(body['data'])),
      ).toPromise();
  }

  getByStore(storeId): Promise<Bill[]> {
    return this.httpClient.get(`${API.ROOT}/store/bill/${storeId}`)
      .pipe(
        map((body: any) => body['data'].map(i => new Bill(i)),
      ),
      ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeSerice.currentStore.id);
  }

  create(bill: Bill) {
    return this.httpClient.post(`${API.ROOT}/bill/create`, {
      idEmp: bill.employeeId,
      totalPrice: bill.totalPrice,
      idStore: bill.storeId,
      createDay: bill.createdDate,
      khachhangByIdCustomer: {
        idKhachhang: bill.customerId,
      },
    })
    .pipe(
        catchError(() => of('Error, could not add bill')),
    );
  }

  update(bill: Bill) {
    return this.httpClient.put(`${API.ROOT}/bill/${bill.id}`, {
      idBill: bill.id,
      idEmp: bill.employeeId,
      totalPrice: bill.totalPrice,
      idStore: bill.storeId,
    })
    .pipe(
        catchError(() => of('Error, could not update bill')),
    ).toPromise();
  }
}
