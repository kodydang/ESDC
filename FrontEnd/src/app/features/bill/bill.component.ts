import { MerchandiseService } from 'src/app/provider/merchandise.service';
import { BillDetails } from 'src/app/shared/models/bill-details';
import { Bill } from './../../shared/models/bill';
import { Customer } from './../../shared/models/customer';
import { CustomerService } from './../../provider/customer.service';
import { Router } from '@angular/router';
import { BillService } from './../../provider/bill.service';
import { Component, OnInit } from '@angular/core';
import { Employee, Merchandise } from 'src/app/shared/models';
import { EmployeeService } from 'src/app/provider/employee.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  data: any[];
  dataSorted: any[] = [];

  employees: Employee[] = [];
  bills: Bill[] = [];
  customers: Customer[] = [];
  products: Merchandise[] = [];

  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };
  open = false;
  isUpdate: boolean;

  sortKey = '';
  sortReverse = false;
  filter = '';

  constructor(
    private employeeService: EmployeeService,
    private merchandiseService: MerchandiseService,
    private billService: BillService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.getCustomers(),
      this.getEmployees(),
      this.getBills(),
      this.getProducts(),
    ]).then((res) => {
      this.customers = res[0];
      this.employees = res[1];
      this.bills = res[2];
      this.products = res[3];

      this.data = this.bills.map(i => ({
        ...i,
        customer: this.customers.find(x => x.id === i.customerId),
        employee: this.employees.find(x => x.id === i.employeeId),
        details: i.details.map(x => ({
          ...x,
          name: this.products.find(y => y.id === x.productId).name,
        })),
      }));

      this.data = this.data.filter(i => i.customer && i.employee);

      this.dataSorted = this.data.map(i => ({
        ...i,
        customerName: i.customer.name,
        employeeName: i.employee.name,
        productName: i.details ? i.details.map(x => x.name).join(' ') : '',
        createdDate: `${moment(i.createdDate).format('L')} ${moment(i.createdDate).format('LT')}`,
        details: i.details,
      }));
    });
  }

  getCustomers() {
    return this.customerService.getFromCurrentStore().then(
      (res: Customer[]) => res,
      (er) => {
        console.error(er);
        return [];
      });
  }

  getBills(): Promise<Bill[]> {
    return Promise.all([
      this.billService.getFromCurrentStore(),
      this.billService.getAllDetails(),
    ]).then(
      (res: any) => {
        const bills: Bill[] = res[0];
        const details: BillDetails[] = res[1];
        return bills.map((i) => {
          i.details = details.filter(x => x.billId === i.id);
          return i;
        });
      },
      (er) => {
        console.error(er);
        return [];
      });
  }

  getEmployees() {
    return this.employeeService.getFromCurrentStore().then(
      (res: Employee[]) => res,
      (er) => {
        console.error(er);
        return [];
      });
  }

  getProducts() {
    return this.merchandiseService.getFromCurrentStore().then(
      (res: Merchandise[]) => res,
      (er) => {
        console.error(er);
        return [];
      });
  }

  sortBy(type) {
    if (this.sortKey === type) {
      this.sortReverse = !this.sortReverse;
      return this.dataSorted = _.reverse(this.dataSorted);
    }

    this.sortKey = type;
    this.sortReverse = false;
    return this.dataSorted = _.sortBy(this.dataSorted, [type]);
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
}
