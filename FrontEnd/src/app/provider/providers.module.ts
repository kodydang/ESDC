import { BillService } from './bill.service';
import { AuthenticationService } from './authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { EmployeeService } from './employee.service';
import { CustomerService } from './customer.service';
import { MerchandiseService } from './merchandise.service';
import { CategoryService } from './category.service';
import { ReportService } from './report.service';
import { StoreService } from './store.service';

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
    CategoryService,
    ReportService,
    StoreService,
    BillService,
    AuthenticationService,
  ],
})
export class ProvidersModule { }
