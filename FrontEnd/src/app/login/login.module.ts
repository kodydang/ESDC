import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './change-pass/change-pass.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    ChangePassComponent,
  ],
  exports: [
    LoginComponent,
    ChangePassComponent,
  ],
})
export class LoginModule { }
