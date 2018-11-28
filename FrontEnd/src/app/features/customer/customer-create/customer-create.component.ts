import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Customer } from '../../../shared/models/customer';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
})
export class CustomerCreateComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() customer;
  @Input() isUpdate;
  submitted = false;
  @Input() dateTime: string;
  constructor() { }

  ngOnInit() {
  }
  mapDate(date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }

  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.customer.birthday = this.mapDate(this.dateTime);
    this.submit.emit(this.customer);
  }
  onGenderClick(value) {
    this.customer.gender = value;
  }
}
