import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreCreateComponent } from './store-create/store-create.component';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TypeaheadModule,
  ],
  declarations: [
    StoreComponent,
    StoreCreateComponent,
  ],
  exports: [
    StoreComponent,
    StoreCreateComponent,
  ],
})
export class StoreModule { }
