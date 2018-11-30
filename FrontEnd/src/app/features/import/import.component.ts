import { CategoryService } from './../../provider/category.service';
import { Category } from './../../shared/models/category';
import { Component, OnInit } from '@angular/core';
import { Merchandise } from 'src/app/shared/models';
import { MerchandiseService } from 'src/app/provider/merchandise.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  cart: any[] = [];
  category: Category[] = [];
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

  constructor(
    private merchandiseService: MerchandiseService,
    private notifyService: NotificationBarService,
    private categoryService: CategoryService,

  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categoryService.getFromCurrentStore().then(
      (res: Category[]) => this.category = res,
    );

    this.merchandiseService.getFromCurrentStore().then(
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

  onSubmit() {
    if (this.filterNewItems().length) {
      return;
    }

    this.merchandiseService.addToCurrentStore(this.cart)
      .then(
        () => this.notifyService.create({
          message: 'Import completed successfully.',
          type: NotificationType.Success,
        }),
      )
      .catch(
        () => this.notifyService.create({
          message: 'Failed to import merchandises.',
          type: NotificationType.Error,
        },
      ));
  }

  filterNewItems() {
    let result: Merchandise[];
    result = this.cart.filter(i => !this.merchandises.find(x => x.id === i.id));

    return result;
  }
}
