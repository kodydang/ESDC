import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { Employee } from 'src/app/shared/models';
import { EmployeeService } from '../../../provider/employee.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {
  @Input() employee: Employee;
  @Input() isUpdate;
  @Input() dateTime: string;
  @Input() user: any;

  checkUsername = false;
  submitted = false;
  constructor(
    private employeeService: EmployeeService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    console.log(this.employee);
  }

  mapDate(date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
  submit() {
    if (this.isUpdate) {
      this.update();
    } else {
      this.add();
    }
    this.ref.markForCheck();
  }

  add() {
    this.employee.birthday = this.mapDate(this.dateTime);
    this.employeeService.addUser(this.user)
      .then(() => {
        this.employeeService.add(this.employee, this.user)
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.warn(err);
          });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  update() {
    this.employee.birthday = this.mapDate(this.dateTime);
    this.employeeService.update(this.employee)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  checkAccountUser(username) {
    this.checkUsername = false;
  }
}
