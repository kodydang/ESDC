import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { LoginService } from './../../provider/login.service';
import { NotificationType, NotificationBarService } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  account: any;
  passToChange: string = '';
  rePassToChange: string = '';

  constructor(
    private loginService: LoginService,
    private ref: ChangeDetectorRef,
    private notifyService: NotificationBarService,
  ) {
    this.account = {
      nameUser: sessionStorage.getItem('username'),
      userPassword: '',
      roleName: sessionStorage.getItem('role'),
      status: 1,
      createDay: new Date(),
    };
  }

  ngOnInit() {
  }

  submit() {
    this.loginService.changePass({ user: this.account, passToChange: this.passToChange })
      .then((res: any) => {
        if (res.status === 'SUCCESS') {
          this.notifyService.create({
            message: 'Process changed password successfully.',
            type: NotificationType.Success,
          });
        }
        if (res.status === 'FAILED') {
          this.notifyService.create({
            message: 'Failed to change password.',
            type: NotificationType.Error,
          });
        }
      });
  }

}
