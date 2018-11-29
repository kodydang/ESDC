import { Router } from '@angular/router';
import { BillService } from './../../provider/bill.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models';
import { EmployeeService } from 'src/app/provider/employee.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  employee = new Employee({});
  employees: Employee[] = [];
  employeeSorted: any[] = [];
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
    private router: Router,
    private employeeService: EmployeeService,
    private billService: BillService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.employeeService.getFromCurrentStore().then(
      (res: Employee[]) => {
        this.employees = res;
        this.employeeSorted = this.employees.map(i => ({
          username: i.username,
          gender: i.gender,
          name: i.name,
          address: i.address,
          phone: i.phone,
          birthday: moment(i.birthday).format('L'),
          role: i.role,
          data: i,
          onboardDay: i.createdDate,
        }));
      },
      (er) => {
        console.warn(er);
      });
  }

  sortBy(type) {
    if (this.sortKey === type) {
      this.sortReverse = !this.sortReverse;
      return this.employeeSorted = _.reverse(this.employeeSorted);
    }

    this.sortKey = type;
    this.sortReverse = false;
    return this.employeeSorted = _.sortBy(this.employeeSorted, [type]);
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
    this.employee = new Employee({});
  }

  edit(event) {
    this.isUpdate = true;
    this.employee = new Employee(event);
  }

  addEvent(event) {
    console.log(event);
  }
}
