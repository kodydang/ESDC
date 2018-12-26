import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { Customer } from '../../../shared/models/customer';
import { CustomerService } from '../../../provider/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
})
export class CustomerCreateComponent implements OnInit {
  @Input() customer: Customer;
  @Input() isUpdate;
  @Input() dateTime: string;
  constructor(
    private customerService: CustomerService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  mapDate(date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }

  add() {
    this.customer.birthday = this.mapDate(this.dateTime);
    this.customerService.create(this.customer)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  update() {
    this.customer.birthday = this.mapDate(this.dateTime);
    this.customerService.update(this.customer)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  delete() {
    this.customerService.delete(this.customer)
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.warn(err);
    });
  }

  submit() {
    if (this.isUpdate) {
      this.update();
    } else {
      this.add();
    }
    this.ref.markForCheck();
  }
  onGenderClick(value) {
    this.customer.gender = value;
  }
}
