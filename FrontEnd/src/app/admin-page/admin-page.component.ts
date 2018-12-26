import { StoreService } from './../provider/store.service';
import { Account } from './../shared/models/account';
import { AuthenticationService } from './../provider/authentication.service';
import { APP, PAGE, ROLE } from './../shared/constants';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store } from '../shared/models';

const ELEMENT_SELECTOR = {
  USER_NAME: 'input_Username',
  PASSWORD: 'input_Password',
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  readonly PAGE = PAGE;
  readonly APP = APP;
  readonly ROLE = ROLE;
  menu = [
    {
      title: 'General',
      permissionLevel: ROLE.STAFF.LEVEL,
      pages: [
        PAGE.PAYMENT,
        PAGE.IMPORT,
      ],
    },
    {
      title: 'Admin',
      permissionLevel: ROLE.MANAGER.LEVEL,
      pages: [
        PAGE.EMPLOYEE,
        PAGE.MERCHANDISE,
        PAGE.CATEGORY,
        PAGE.CUSTOMER,
        PAGE.BILL,
        PAGE.REPORT,
        // PAGE.SETTING,
      ],
    },
    {
      title: 'Super Admin',
      permissionLevel: ROLE.SUPER_ADMIN.LEVEL,
      pages: [
        PAGE.STORE,
      ],
    },
  ].filter(i => this.authService.havePermission(i.permissionLevel));

  clicked = false;
  account: Account;
  pageTitle = 'Page title';
  pageIcon = '';
  stores: Store[] = [];

  openDiaglog: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public storeService: StoreService,
  ) {
    this.account = new Account({
      username: sessionStorage.getItem('username'),
      role: sessionStorage.getItem('role'),
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url.replace(`/${PAGE.ADMIN.URL}/`, '');

        Object.keys(PAGE).forEach((i) => {
          if (PAGE[i].URL === url) {
            this.pageTitle = PAGE[i].TITLE;
            this.pageIcon = PAGE[i].ICON;
            return;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.storeService.getAll().then(res => this.stores = res);
  }

  logout() {
    this.router.navigate(['/login']);
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  }

  reload() {
    window.location.reload();
  }

  changePass() {
    this.openDiaglog = true;
  }
}
