import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { CustomerCreateComponent } from './customer-create/customer-create.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [
    CustomerCreateComponent,
  ],
  exports: [
    NgxPaginationModule,
    CustomerCreateComponent,

  ],
})
export class CustomerModule { }
