import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from '../../provider/employee.service';
import { Employee } from '../../shared/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  listEmployee: Employee[] = [];
  listEmployeeSorted: Employee[] = [];
  typeSort = ['', '', '', ''];
  style: boolean[] = [false, false, false, false];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 3,
    currentPage: 1,
  };
  open = false;
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
        this.listEmployee = res;
        this.listEmployeeSorted = this.listEmployee;
        // console.log(this.listEmployee);
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
      return this.listEmployeeSorted = _.sortBy(this.listEmployeeSorted, [type]);
    }
    return this.listEmployeeSorted = _.reverse(_.sortBy(this.listEmployeeSorted, [type]));
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
    this.open = !this.open;
  }

  addEvent(event) {
    console.log(event);

  }
}
