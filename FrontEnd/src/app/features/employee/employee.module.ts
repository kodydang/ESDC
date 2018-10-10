import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { EmployeeCreateComponent } from './employee-create/employee-create.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [
    EmployeeCreateComponent,
  ],
  exports: [
    NgxPaginationModule,
    EmployeeCreateComponent,

  ],
})
export class EmployeeModule { }