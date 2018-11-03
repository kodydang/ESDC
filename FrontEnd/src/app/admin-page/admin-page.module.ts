import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageComponent } from './admin-page.component';
import { EmployeeModule } from '../features/employee/employee.module';
import { AdminRoutingModule } from './admin-page-routing.module';

import { EmployeeComponent } from '../features/employee/employee.component';
import { ReportComponent } from '../features/report/report.component';
import { MerchandiseComponent } from '../features/merchandise/merchandise.component';
import { MerchandiseModule } from '../features/merchandise/merchandise.module';
import { CustomerComponent } from '../features/customer/customer.component';
import { CustomerModule } from '../features/customer/customer.module';
import { CategoryComponent } from '../features/category/category.component';
import { CategoryModule } from '../features/category/category.module';
import { PaymentComponent } from '../features/payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeModule,
    CustomerModule,
    MerchandiseModule,
    CategoryModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminPageComponent,
    EmployeeComponent,
    MerchandiseComponent,
    CategoryComponent,
    ReportComponent,
    CustomerComponent,
    PaymentComponent,
  ],
  exports: [
    AdminPageComponent,
  ],
})
export class AdminPageModule { }
