import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { EmployeeService } from './employee.service';
import { CustomerService } from './customer.service';
import { MerchandiseService } from './merchandise.service';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
  ],
  providers: [
    LoginService,
    EmployeeService,
    CustomerService,
    MerchandiseService,
    ReportService,
  ],
})
export class ProvidersModule { }
