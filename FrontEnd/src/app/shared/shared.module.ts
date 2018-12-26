import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NotificationBarModule } from 'ngx-notification-bar/release';

@NgModule({
  imports: [
    MomentModule,
    NotificationBarModule,
  ],
  exports: [
    MomentModule,
    NotificationBarModule,
  ],
})
export class SharedModule { }
