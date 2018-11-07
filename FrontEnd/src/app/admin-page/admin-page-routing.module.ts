import { AdminPageComponent } from './admin-page.component';
import { CategoryComponent } from '../features/category/category.component';
import { CustomerComponent } from '../features/customer/customer.component';
import { EmployeeComponent } from '../features/employee/employee.component';
import { ImportComponent } from './../features/import/import.component';
import { MerchandiseComponent } from '../features/merchandise/merchandise.component';
import { NgModule } from '@angular/core';
import { PAGE } from './../shared/constants';
import { PaymentComponent } from '../features/payment/payment.component';
import { ReportComponent } from '../features/report/report.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: PAGE.ADMIN.URL,
    component: AdminPageComponent,
    children: [
      {
        path: PAGE.EMPLOYEE.URL,
        component: EmployeeComponent,
      },
      {
        path: PAGE.CUSTOMER.URL,
        component: CustomerComponent,
      },
      {
        path: PAGE.REPORT.URL,
        component: ReportComponent,
      },
      {
        path: PAGE.MERCHANDISE.URL,
        component: MerchandiseComponent,
      },
      {
        path: PAGE.CATEGORY.URL,
        component: CategoryComponent,
      },
      {
        path: PAGE.PAYMENT.URL,
        component: PaymentComponent,
      },
      {
        path: PAGE.IMPORT.URL,
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
