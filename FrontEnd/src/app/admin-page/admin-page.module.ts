import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageComponent } from './admin-page.component';
import { EmployeeModule } from '../features/employee/employee.module';
import { AdminRoutingModule } from './admin-page-routing.module';

import { EmployeeComponent } from '../features/employee/employee.component';
import { ReportComponent } from '../features/report/report.component';
import { MerchandiseComponent } from '../features/merchandise/merchandise.component';
import { CustomerComponent } from '../features/customer/customer.component';
import { CustomerModule } from '../features/customer/customer.module';
import { MerchandiseModule } from '../features/merchandise/merchandise.module';
import { ReportModule } from '../features/report/report.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeeModule,
    CustomerModule,
    MerchandiseModule,
    ReportModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminPageComponent,
    EmployeeComponent,
    MerchandiseComponent,
    ReportComponent,
    CustomerComponent,
  ],
  exports: [
    AdminPageComponent,
  ],
})
export class AdminPageModule { }
