import { CategoryComponent } from './category.component';
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
    CategoryComponent,
    CategoryCreateComponent,
  ],
  exports: [
    CategoryComponent,
    CategoryCreateComponent,
  ],
})
export class CategoryModule { }
