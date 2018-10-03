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

  listCustomer: Customer[] = [];
  listCustomerSorted: Customer[] = [];
  typeSort = ['', '', '', ''];
  style: boolean[] = [false, false, false, false];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 3,
    currentPage: 1,
  };
  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.customerService.getAll().subscribe(
      (res: any) => {
        this.listCustomer = res;
        this.listCustomerSorted = this.listCustomer;
        console.log(this.listCustomer);
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
    console.log(this.typeSort);

    if (this.style[position]) {
      return this.listCustomerSorted = _.sortBy(this.listCustomerSorted, [type]);
    }
    return this.listCustomerSorted = _.reverse(_.sortBy(this.listCustomerSorted, [type]));
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

}
