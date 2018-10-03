import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { EmployeeService } from './employee.service';
import { CustomerService } from './customer.service';

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
  ],
})
export class ProvidersModule { }
