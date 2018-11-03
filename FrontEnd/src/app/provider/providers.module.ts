import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { EmployeeService } from './employee.service';
import { CustomerService } from './customer.service';
import { MerchandiseService } from './merchandise.service';
import { CategoryService } from './category.service';

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
  ],
})
export class ProvidersModule { }
