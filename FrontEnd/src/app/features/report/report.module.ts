import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReportYearComponent } from './report-year/report-year.component';
import { ReportMerchandiseComponent } from './report-merchandise/report-merchandise.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [
    ReportYearComponent,
    ReportMerchandiseComponent,
  ],
  exports: [
    NgxPaginationModule,
    ReportYearComponent,
    ReportMerchandiseComponent,
  ],
})
export class ReportModule { }
