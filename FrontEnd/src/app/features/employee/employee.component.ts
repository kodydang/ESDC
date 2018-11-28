import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from '../../provider/employee.service';
import { Employee } from '../../shared/models/employee';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.employeeService.getAll().subscribe(
      (res: any) => {
        this.employees = res;
        this.employeeSorted = this.employees.map(i => ({
          username: i.username,
          gender: i.gender,
          name: i.name,
          address: i.address,
          phone: i.phone,
          birthday: moment(i.birthday).format('L'),
          role: this.getRoleTitle(i.roleKey),
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

  getRole(key: string) {
    const index = Object.keys(ROLE).find(key => ROLE[key].LEVEL === key);
    return ROLE[index];
  }
  getRoleTitle(key: string) {
    const role = this.getRole(key);
    return role ? role.TITLE : 'Unknown';
  }
}
