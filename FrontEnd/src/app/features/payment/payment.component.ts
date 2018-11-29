import { CustomerService } from './../../provider/customer.service';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { MerchandiseService } from './../../provider/merchandise.service';
import { Customer } from './../../shared/models/customer';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Merchandise } from 'src/app/shared/models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('cartForm') cartForm: NgForm;
  @ViewChild('customerForm') customerForm: NgForm;

  customer: Customer = new Customer({});
  cart: Merchandise[] = [];
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
      category: 'Unknown',
    });
  }

  get isItemValid() {
    return (this.newMerchandise.id !== undefined && this.newMerchandise.quantity <= this.stock);
  }

  constructor(
    private merchandiseService: MerchandiseService,
    private notifyService: NotificationBarService,
    private customerService: CustomerService,
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
    console.log(form.value);
    this.customerService.create(form.value).then(
      res => console.log(res),
    );

    this.merchandiseService.addToCurrentStore(
      _.cloneDeep(this.cart).map((i) => {
        i.quantity = -i.quantity;
        return i;
      }))
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
}
