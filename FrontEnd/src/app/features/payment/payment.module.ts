import { NgxMaskModule } from 'ngx-mask';
import { PaymentComponent } from './payment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    TypeaheadModule,
  ],
  declarations: [
    PaymentComponent,
  ],
  exports: [
    PaymentComponent,
  ],
})
export class PaymentModule { }
