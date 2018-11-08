import { APP, PAGE } from './../shared/constants';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

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
  menu = [
    {
      title: 'Super Admin',
      pages: [
        PAGE.STORE,
      ],
    },
    {
      title: 'Admin',
      pages: [
        PAGE.EMPLOYEE,
        PAGE.MERCHANDISE,
        PAGE.CATEGORY,
        PAGE.CUSTOMER,
        PAGE.REPORT,
        PAGE.SETTING,
      ],
    },
    {
      title: 'General',
      pages: [
        PAGE.PAYMENT,
        PAGE.IMPORT,
      ],
    },
  ];

  clicked = false;
  pageTitle = 'Page title';
  pageIcon = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // this.account = JSON.parse(localStorage.getItem('USER'));

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

  ngOnInit() {}

  logout() {
    this.router.navigate(['/login']);
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
