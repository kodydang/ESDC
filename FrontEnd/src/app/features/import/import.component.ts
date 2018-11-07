import { Component, OnInit } from '@angular/core';
import { Merchandise } from 'src/app/shared/models';
import { MerchandiseService } from 'src/app/provider/merchandise.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  cart: Merchandise[] = [];
  merchandises: Merchandise[] = [];
  newMerchandise = this.defaultMerchandise;
  sortKey = '';
  sortReverse = false;

  get defaultMerchandise() {
    return new Merchandise({});
  }

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

  constructor(private merchandiseService: MerchandiseService) { }

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
      quantity: undefined,
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
}
