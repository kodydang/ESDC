import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    MomentModule,
  ],
  exports: [
    MomentModule,
  ],
})
export class SharedModule { }
