import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
// import { Payment } from '../../shared/models';
// import { PaymentService } from '../../provider/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  // payment = {
  //   name: '',
  //   gender: '',
  //   address: '',
  //   email: '',
  //   birthday: null,
  //   phone: '',
  // };
  // listPayment: Payment[] = [];
  // listPaymentSorted: Payment[] = [];
  // typeSort = ['', '', '', ''];
  // style: boolean[] = [false, false, false, false];
  // paginateConfig = {
  //   id: 'paginator',
  //   itemsPerPage: 4,
  //   currentPage: 1,
  // };
  // isUpdate: boolean;
  // constructor(
  //   private paymentService: PaymentService,
  // ) { }

  ngOnInit() {
    // this.getAll();
  }

  // getAll() {
  //   this.paymentService.getAll().subscribe(
  //     (res: any) => {
  //       this.listPayment = res;
  //       this.listPaymentSorted = this.listPayment;
  //       // console.log(this.listPayment);
  //     },
  //     (er) => {
  //       console.warn(er);
  //     });
  // }

  // formatDate(date) {
  //   return moment(date).format('ll');
  // }

  // sortBy(type, position) {
  //   this.typeSort[position] = type;
  //   this.style[position] = !this.style[position];
  //   // console.log(this.typeSort);

  //   if (this.style[position]) {
  //     return this.listPaymentSorted = _.sortBy(this.listPaymentSorted, [type]);
  //   }
  //   return this.listPaymentSorted = _.reverse(_.sortBy(this.listPaymentSorted, [type]));
  // }

  // sortIcon(type, position) {
  //   if (this.typeSort[position] === type) {
  //     if (this.style[position]) {
  //       return 'fa-sort-down';
  //     }
  //     return 'fa-sort-up';
  //   }
  //   return 'fa-sort';
  // }

  // onPageChange(number) {
  //   this.paginateConfig.currentPage = number;
  // }

  // addEvent(event) {
  //   console.log(event);

  // }
  // add() {
  //   this.isUpdate = false;
  //   this.payment.name = '';
  //   this.payment.gender = '';
  //   this.payment.address = '';
  //   this.payment.email = '';
  //   this.payment.birthday = null;
  //   this.payment.phone = '';
  // }

  // edit(event) {
  //   this.isUpdate = true;
  //   this.payment.name = event.name;
  //   this.payment.gender = event.gender;
  //   this.payment.address = event.address;
  //   this.payment.email = event.email;
  //   this.payment.birthday = event.birthday;
  //   this.payment.phone = event.phone;
  // }
}
