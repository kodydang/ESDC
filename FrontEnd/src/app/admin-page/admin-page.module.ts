import { BillModule } from './../features/bill/bill.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageComponent } from './admin-page.component';
import { EmployeeModule } from '../features/employee/employee.module';
import { AdminRoutingModule } from './admin-page-routing.module';

import { MerchandiseModule } from '../features/merchandise/merchandise.module';
import { CustomerModule } from '../features/customer/customer.module';
import { CategoryModule } from '../features/category/category.module';
import { ReportModule } from '../features/report/report.module';
import { PaymentModule } from '../features/payment/payment.module';
import { ImportModule } from '../features/import/import.module';
import { StoreModule } from '../features/store/store.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EmployeeModule,
    CustomerModule,
    MerchandiseModule,
    CategoryModule,
    ReportModule,
    PaymentModule,
    ImportModule,
    StoreModule,
    BillModule,
    AdminRoutingModule,
    FormsModule,
  ],
  declarations: [
    AdminPageComponent,
  ],
  exports: [
    AdminPageComponent,
  ],
})
export class AdminPageModule { }
