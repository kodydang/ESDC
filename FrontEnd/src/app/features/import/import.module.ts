import { TypeaheadModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ImportComponent } from './import.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
  ],
  exports: [ImportComponent],
  declarations: [ImportComponent],
  providers: [],
})
export class ImportModule { }
