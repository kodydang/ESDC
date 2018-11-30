import { BillDetails } from './../shared/models/bill-details';
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
    private storeService: StoreService,
  ) { }

  getAll() {
    return this.httpClient.get(`${API.ROOT}/bill`)
      .pipe(
        map(
          (body: any) => body['data'].map(i => new Bill(i)),
        ),
      ).toPromise();
  }

  getById(id) {
    return this.httpClient.get(`${API.ROOT}/bill/${id}`)
      .pipe(
        map((body: any) => new Bill(body['data'])),
      ).toPromise();
  }

  getAllDetails(): Promise<BillDetails[]> {
    return this.httpClient.get(`${API.ROOT}/bill-infor`).pipe(
      map(
        (body: any) => body['data'].map(i => new BillDetails(i)),
      ),
    ).toPromise();
  }

  getDetailsOfBill(billId) {
    return this.getAllDetails()
      .then(res => res.filter(x => x.billId === billId));
  }

  getByStore(storeId): Promise<Bill[]> {
    return this.httpClient.get(`${API.ROOT}/store/list-bill/${storeId}`)
      .pipe(
        map((body: any) => body.map(i => new Bill(i)),
      ),
      ).toPromise();
  }

  getFromCurrentStore() {
    return this.getByStore(this.storeService.currentStore.id);
  }

  create(bill: Bill) {
    return this.httpClient.post(`${API.ROOT}/bill/create`, {
      idEmp: bill.employeeId,
      totalPrice: bill.totalPrice,
      idStore: bill.storeId,
      createDay: bill.createdDate,
      idCustomer: bill.customerId,
    })
    .pipe(
      map(res => new Bill(res['data'])),
    ).toPromise();
  }

  createDetails(details: BillDetails) {
    return this.httpClient.post(
      `${API.ROOT}/bill-infor/create`,
      {
        idProduct: details.productId,
        quantities: details.quantity,
        price: details.price,
        idBill: details.billId,
      },
    ).toPromise();
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
