import { BillService } from './../../provider/bill.service';
import * as _ from 'lodash';
import { AuthenticationService } from './../../provider/authentication.service';
import { Bill, Merchandise } from 'src/app/shared/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from './../../shared/models/customer';
import { CustomerService } from './../../provider/customer.service';
import { forkJoin } from 'rxjs';
import { MerchandiseService } from './../../provider/merchandise.service';
import { NgForm } from '@angular/forms';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { StoreService } from 'src/app/provider/store.service';
import { promise } from 'protractor';
import { BillDetails } from 'src/app/shared/models/bill-details';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('cartForm') cartForm: NgForm;
  @ViewChild('customerForm') customerForm: NgForm;

  customer: Customer = new Customer({});
  cart: any[] = [];
  merchandises: Merchandise[] = [];
  newMerchandise = this.defaultMerchandise;
  sortKey = '';
  sortReverse = false;

  get totalQuantity() {
    let total = 0;
    this.cart.forEach(i => total += i.quantity);
    return total;
  }

  get totalPrice() {
    let total = 0;
    this.cart.forEach(i => total += i.price * i.quantity);
    return total;
  }

  get stock() {
    const merchandise = this.merchandises.find(i => i.id === this.newMerchandise.id);
    const inCart = this.cart.find(i => i.id === this.newMerchandise.id);
    const toBuy = inCart ? inCart.quantity : 0;
    return merchandise ? merchandise.quantity - toBuy : 0;
  }

  get price() {
    const merchandise = this.merchandises.find(i => i.id === this.newMerchandise.id);
    return merchandise ? merchandise.price : 0;
  }

  get defaultMerchandise() {
    return new Merchandise({
      quantity: 0,
      category: 'Unclassified',
    });
  }

  get isItemValid() {
    return (this.newMerchandise.id !== undefined && this.newMerchandise.quantity <= this.stock);
  }

  constructor(
    private merchandiseService: MerchandiseService,
    private notifyService: NotificationBarService,
    private customerService: CustomerService,
    private storeService: StoreService,
    private billService: BillService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.merchandiseService.getFromCurrentStore().then(
      (res: Merchandise[]) => {
        this.merchandises = res;
        this.cart = [];
      },
      (er) => {
        console.warn(er);
      });
  }

  sortBy(type) {
    if (this.sortKey === type) {
      this.sortReverse = !this.sortReverse;
      return this.cart = _.reverse(this.cart);
    }

    this.sortKey = type;
    this.sortReverse = false;
    return this.cart = _.sortBy(this.cart, [type]);
  }

  sortIcon(type) {
    if (this.sortKey === type) {
      return this.sortReverse ? 'fa-sort-down' : 'fa-sort-up';
    }
    return 'fa-sort';
  }

  delete(item) {
    this.cart.splice(this.cart.indexOf(item), 1);
  }

  select(typeaheadMatch) {
    this.newMerchandise = new Merchandise({
      ...typeaheadMatch.item,
      quantity: this.newMerchandise.quantity || 1,
    });
  }

  addToCart() {
    const item = this.cart.find(i => i.id === this.newMerchandise.id);
    if (item) {
      item.quantity += this.newMerchandise.quantity;
    } else {
      this.cart.push(this.newMerchandise);
    }
    this.newMerchandise = this.defaultMerchandise;
  }

  clear() {
    this.cart = [];
  }

  resetForm(form: NgForm) {
    this.newMerchandise = this.defaultMerchandise;
    this.clear();
    form.reset();
  }

  formSubmit(form: NgForm) {
    Promise.all([
      this.updateCustomer(form.value),
      this.updateProduct(),
    ])
      .then(res => this.createBill(res[0], this.cart))
      .then(
        () => {
          this.notifyService.create({
            message: 'Process completed successfully.',
            type: NotificationType.Success,
          });
          this.resetForm(this.cartForm);
        })
      .catch(
        () => this.notifyService.create({
          message: 'Failed to create payment bill.',
          type: NotificationType.Error,
        },
      ));
  }

  async updateCustomer(data: any) {
    const customer = new Customer({
      ...data,
      name: data.nameCustomer,
    });
    const res = await this.customerService.update(customer);
    return new Customer(res['data']);
  }

  async updateProduct(): Promise<Merchandise[]> {
    const itemsToUpdate = this.merchandises.filter(i => this.cart.find(x => i.id === x.id));
    itemsToUpdate.forEach((i) => {
      const quantity = this.cart.find(x => i.id === x.id).quantity;
      i.quantity -= quantity;
    });
    await this.merchandiseService.update(itemsToUpdate);
    return itemsToUpdate;
  }

  createBill(customer: Customer, items: Merchandise[]) {
    const bill = new Bill({
      employeeId: this.authService.currentAccount.id,
      storeId: this.storeService.currentStore.id,
      customerId: customer.id,
      totalPrice: items.map(i => i.price * i.quantity).reduce((x, y) => x + y),
    });
    return this.billService.create(bill)
      .then(res => Promise.all(items.map(i => this.billService.createDetails(
        new BillDetails({
          ...i,
          billId: res.id,
          productId: i.id,
          id: null,
        }),
      ))));
  }
}
