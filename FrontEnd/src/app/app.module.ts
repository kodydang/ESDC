import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProvidersModule } from './provider/providers.module';
import { AdminPageModule } from './admin-page/admin-page.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { TypeaheadModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,

    // 3rd Libary
    MomentModule,
    NgxMaskModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxPaginationModule,

    ProvidersModule,
    SharedModule,

    // Page modules
    AdminPageModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
