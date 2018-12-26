import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BillComponent } from './bill.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  declarations: [
    BillComponent,
  ],
  exports: [
    BillComponent,
  ],
})
export class BillModule { }
