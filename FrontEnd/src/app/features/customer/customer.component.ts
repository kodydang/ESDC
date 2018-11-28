import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Customer } from '../../shared/models';
import { CustomerService } from '../../provider/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customer = new Customer({});
  customers: Customer[] = [];
  customerSorted: any[] = [];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };

  isUpdate: boolean;

  sortKey = '';
  sortReverse = false;
  filter = '';

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.customerService.getAll().subscribe(
      (res: any) => {
        this.customers = res;
        this.customerSorted = this.customers.map(i => ({
          name: i.name,
          gender: i.gender,
          address: i.address,
          phone: i.phone,
          birthday:  moment(i.birthday).format('L'),
        }));
      },
      (er) => {
        console.warn(er);
      });
  }

  sortBy(type) {
    if (this.sortKey === type) {
      this.sortReverse = !this.sortReverse;
      return this.customerSorted = _.reverse(this.customerSorted);
    }

    this.sortKey = type;
    this.sortReverse = false;
    return this.customerSorted = _.sortBy(this.customerSorted, [type]);
  }

  sortIcon(type) {
    if (this.sortKey === type) {
      return this.sortReverse ? 'fa-sort-down' : 'fa-sort-up';
    }
    return 'fa-sort';
  }

  onPageChange(number) {
    this.paginateConfig.currentPage = number;
  }

  addEvent(event) {
    console.log(event);

  }
  add() {
    this.isUpdate = false;
    this.customer = new Customer({});
  }

  edit(event) {
    this.isUpdate = true;
    this.customer = new Customer(event);
  }
}
