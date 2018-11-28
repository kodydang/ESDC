import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './guards/auth.guard';
import {CanActivate} from "@angular/router";

const routes: Routes = [
  // { path: '', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminPageComponent },
  // { path: 'admin', loadChildren: 'app/admin-page/admin-page.module#AdminPageModule' },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
