import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerComponent } from './customer.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [
    CustomerComponent,
    CustomerCreateComponent,
  ],
  exports: [
    CustomerComponent,
    CustomerCreateComponent,
  ],
})
export class CustomerModule { }
