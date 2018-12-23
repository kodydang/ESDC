import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from '../../provider/employee.service';
import { Employee } from '../../shared/models/employee';
import { NotificationType, NotificationBarService } from 'ngx-notification-bar/release';

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
  dateTime: string;
  openDiaglog: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private notifyService: NotificationBarService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.employeeService.getFromCurrentStore().then(
      (res: Employee[]) => {
        this.employees = res;
        console.log(this.employees);
        this.employeeSorted = this.employees.map(i => ({
          username: i.user.username,
          // gender: i.gender,
          name: i.name,
          // address: i.address,
          phone: i.phone,
          email: i.email,
          birthday: this.formatDate(i.birthday),
          role: i.user.role,
          data: i,
        }));
      },
      (er) => {
        console.warn(er);
      });
  }

  formatDate(date) {
    return moment(date).format('MM/DD/YYYY');
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
    this.dateTime = this.format(new Date());
    this.openDiaglog = true;
  }

  edit(event) {
    this.isUpdate = true;
    this.employee = event.data;
    this.dateTime = this.format(this.employee.birthday);
    this.openDiaglog = true;
  }

  format(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  delete(item) {
    const id = item.id;
    this.employeeService.delete(id)
      .then(() => {
        // window.location.reload();
        this.employeeSorted.splice(this.employeeSorted.indexOf(item), 1);
        this.ref.markForCheck();

        this.notifyService.create({
          message: 'Process deleted successfully.',
          type: NotificationType.Success,
        });
      })
      .catch((err) => {
        this.notifyService.create({
          message: 'Failed to delete.',
          type: NotificationType.Error,
        }),
          console.warn(err);
      });
  }
}
