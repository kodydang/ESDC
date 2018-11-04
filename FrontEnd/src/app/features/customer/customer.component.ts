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
  customer = {
    name: '',
    gender: '',
    address: '',
    email: '',
    birthday: null,
    phone: '',
  };
  listCustomer: Customer[] = [];
  listCustomerSorted: Customer[] = [];
  typeSort = ['', '', '', ''];
  style: boolean[] = [false, false, false, false];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };
  isUpdate: boolean;
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
        // console.log(this.listCustomer);
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
    // console.log(this.typeSort);

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

  addEvent(event) {
    console.log(event);

  }
  add() {
    this.isUpdate = false;
    this.customer.name = '';
    this.customer.gender = '';
    this.customer.address = '';
    this.customer.email = '';
    this.customer.birthday = null;
    this.customer.phone = '';
  }

  edit(event) {
    this.isUpdate = true;
    this.customer.name = event.name;
    this.customer.gender = event.gender;
    this.customer.address = event.address;
    this.customer.email = event.email;
    this.customer.birthday = event.birthday;
    this.customer.phone = event.phone;
  }
}
