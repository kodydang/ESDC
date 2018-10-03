import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { EmployeeComponent } from '../features/employee/employee.component';
import { CustomerComponent } from '../features/customer/customer.component';
import { ReportComponent } from '../features/report/report.component';
import { MerchandiseComponent } from '../features/merchandise/merchandise.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'merchandise',
        component: MerchandiseComponent,
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
