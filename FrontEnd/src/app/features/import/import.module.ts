import { TypeaheadModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ImportComponent } from './import.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    SharedModule,
  ],
  exports: [ImportComponent],
  declarations: [ImportComponent],
  providers: [],
})
export class ImportModule { }
