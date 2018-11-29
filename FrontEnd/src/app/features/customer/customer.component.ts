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
  openDiaglog: boolean = false;
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };

  isUpdate: boolean;

  sortKey = '';
  sortReverse = false;
  filter = '';
  dataTime: string;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  formatDate(date) {
    return moment(date).format('MM/DD/YYYY');
  }
  getAll() {
    this.customerService.getAll().subscribe(
      (res: any) => {
        // console.log(res);
        this.customers = res.data;
        this.customerSorted = this.customers.map(i => ({
          id: i.id,
          name: i.name,
          // gender: i.gender,
          email: i.email,
          phone: i.phone,
          birthday: this.formatDate(i.birthday),
          fullData: i,
        }));
        console.log(this.customerSorted);
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

  add() {
    this.isUpdate = false;
    this.customer = new Customer({});
    this.dataTime = this.format(new Date());
    this.openDiaglog = true;
  }

  edit(event) {
    this.isUpdate = true;
    this.customer = event;
    this.dataTime = this.format(this.customer.birthday);
    this.openDiaglog = true;
  }

  format(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  delete(id) {
    this.customerService.delete(id)
      .then(() => {
        // window.location.reload();
        console.log('deteled ', id);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
}
