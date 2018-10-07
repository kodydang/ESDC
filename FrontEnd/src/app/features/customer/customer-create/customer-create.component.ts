import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';

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
  constructor() { }

  ngOnInit() {
  }

  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.customer.birthday = moment(this.customer.birthday).toDate();
    this.submit.emit(this.customer);
  }
  onGenderClick(value) {
    this.customer.gender = value;
  }
}
