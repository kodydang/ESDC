import { Category } from './../../shared/models/category';
import { MerchandiseService } from './../../provider/merchandise.service';
import { Customer } from './../../shared/models/customer';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Merchandise } from 'src/app/shared/models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  customer: Customer = new Customer({});
  merchandises: Merchandise[] = [];
  cart: Merchandise[] = [];
  newMerchandise = this.defaultMerchandise;
  sortKey = '';
  sortReverse = false;
  constructor(
    private merchandiseService: MerchandiseService,
  ) { }

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
    return merchandise ? merchandise.quantity : 0;
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
    return this.newMerchandise.id !== undefined;
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.merchandiseService.getAll().subscribe(
      (res: any) => {
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

  }
}
