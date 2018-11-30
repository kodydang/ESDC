import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Merchandise } from '../../shared/models';
import { MerchandiseService } from '../../provider/merchandise.service';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.scss'],
})
export class MerchandiseComponent implements OnInit {
  listMerchandise: Merchandise[] = [];
  listMerchandiseSorted: any[] = [];
  typeSort = ['', '', '', ''];
  style: boolean[] = [false, false, false, false];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };
  open = false;
  merchandise = {
    name: '',
    category: '',
    price: 0,
    quantity: 0,
  };
  isUpdate: boolean;
  constructor(
    private merchandiseService: MerchandiseService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.merchandiseService.getFromCurrentStore().then(
      (res: any) => {
        this.listMerchandise = res;
        this.listMerchandiseSorted = this.listMerchandise;
        // console.log(this.listMerchandiseSorted);
      },
      (er) => {
        console.warn(er);
      });
  }

  formatDate(date) {
    return moment(date).format('ll');
  }

  sortBy(type, position) {
    this.typeSort[position] = type;
    this.style[position] = !this.style[position];

    if (this.style[position]) {
      return this.listMerchandiseSorted = _.sortBy(this.listMerchandiseSorted, [type]);
    }
    return this.listMerchandiseSorted = _.reverse(_.sortBy(this.listMerchandiseSorted, [type]));
  }

  sortIcon(type, position) {
    if (this.typeSort[position] === type) {
      if (this.style[position]) {
        return 'fa-sort-down';
      }
      return 'fa-sort-up';
    }
    return 'fa-sort';
  }

  onPageChange(number) {
    this.paginateConfig.currentPage = number;
  }

  add() {
    this.isUpdate = false;
    this.merchandise.name = '';
    this.merchandise.category = '';
    this.merchandise.price = 0;
    this.merchandise.quantity = 0;
  }

  edit(event) {
    this.isUpdate = true;
    this.merchandise.name = event.name;
    this.merchandise.category = event.category;
    this.merchandise.price = event.price;
    this.merchandise.quantity = event.quantity;
  }

  addEvent(event) {
    console.log(event);

  }

}
