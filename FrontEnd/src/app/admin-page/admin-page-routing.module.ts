import { PAGE } from './../shared/constants';
import { ImportComponent } from './../features/import/import.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { EmployeeComponent } from '../features/employee/employee.component';
import { CustomerComponent } from '../features/customer/customer.component';
import { ReportComponent } from '../features/report/report.component';
import { MerchandiseComponent } from '../features/merchandise/merchandise.component';
import { CategoryComponent } from '../features/category/category.component';
import { PaymentComponent } from '../features/payment/payment.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: PAGE.EMPLOYEE,
        component: EmployeeComponent,
      },
      {
        path: PAGE.CUSTOMER,
        component: CustomerComponent,
      },
      {
        path: PAGE.REPORT,
        component: ReportComponent,
      },
      {
        path: PAGE.MERCHANDISE,
        component: MerchandiseComponent,
      },
      {
        path: PAGE.CATEGORY,
        component: CategoryComponent,
      },
      {
        path: PAGE.PAYMENT,
        component: PaymentComponent,
      },
      {
        path: PAGE.IMPORT,
        component: ImportComponent,
      },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule { }
