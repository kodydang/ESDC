import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
})
export class CustomerCreateComponent implements OnInit {
  @Output() submit = new EventEmitter();
  employee = {
    name: '',
    gender: '',
    address: '',
    email: '',
    birthday: null,
    phone: '',
  };
  submitted = false;
  constructor() { }

  ngOnInit() {
  }

  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.employee.birthday = moment(this.employee.birthday).toDate();
    this.submit.emit(this.employee);
  }
  onGenderClick(value) {
    this.employee.gender = value;
  }
}
