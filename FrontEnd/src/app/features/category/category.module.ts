import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [
    CategoryCreateComponent,
  ],
  exports: [
    NgxPaginationModule,
    CategoryCreateComponent,

  ],
})
export class CategoryModule { }
