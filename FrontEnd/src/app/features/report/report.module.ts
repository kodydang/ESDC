import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReportYearComponent } from './report-year/report-year.component';
import { ReportMerchandiseComponent } from './report-merchandise/report-merchandise.component';
import { ReportComponent } from './report.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [
    ReportComponent,
    ReportYearComponent,
    ReportMerchandiseComponent,
  ],
  exports: [
    ReportComponent,
    ReportYearComponent,
    ReportMerchandiseComponent,
  ],
})
export class ReportModule { }
