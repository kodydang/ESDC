import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { MerchandiseCreateComponent } from './merchandise-create/merchandise-create.component';
import { MerchandiseComponent } from './merchandise.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    MerchandiseComponent,
    MerchandiseCreateComponent,
  ],
  exports: [
    MerchandiseComponent,
    MerchandiseCreateComponent,

  ],
})
export class MerchandiseModule { }
