import { AuthenticationService } from './../provider/authentication.service';
import { APP, PAGE, ROLE } from './../shared/constants';
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
      permissionLevel: ROLE.SUPER_ADMIN.LEVEL,
      pages: [
        PAGE.STORE,
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
        PAGE.REPORT,
        // PAGE.SETTING,
      ],
    },
    {
      title: 'General',
      permissionLevel: ROLE.STAFF.LEVEL,
      pages: [
        PAGE.PAYMENT,
        PAGE.IMPORT,
      ],
    },
  ].filter(i => this.authService.havePermission(i.permissionLevel));

  clicked = false;
<<<<<<< HEAD
  page = PAGE.WELLCOME;
  PAGE = PAGE;
  username :string;
  role : string;

  constructor(private router: Router) {
    // this.account = JSON.parse(localStorage.getItem('USER'));
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');
  }
=======
  pageTitle = 'Page title';
  pageIcon = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
    // this.account = JSON.parse(localStorage.getItem('USER'));
>>>>>>> 405094fcb438a9a656782bbaf6bb1c7fed7c8af8

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
<<<<<<< HEAD
     // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
     sessionStorage.removeItem('username');
     sessionStorage.removeItem('role');
  }

  clickedFeature(page) {
    // this.page = event;
    if (page === PAGE.WELLCOME) {
      this.router.navigate(['admin' , 'wellcome']);
    }
    if (page === PAGE.EMPLOYEE) {
      this.router.navigate(['admin' , 'employee']);
    }
    if (page === PAGE.REPORT) {
      this.router.navigate(['admin' , 'report']);
    }
    if (page === PAGE.CUSTOMER) {
      this.router.navigate(['admin' , 'customer']);
    }
    if (page === PAGE.MERCHANDISE) {
      this.router.navigate(['admin' , 'merchandise']);
    }
    if (page === PAGE.CATEGORY) {
      this.router.navigate(['admin' , 'category']);
    }
    if (page === PAGE.PAYMENT) {
      this.router.navigate(['admin' , 'payment']);
    }
=======
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
>>>>>>> 405094fcb438a9a656782bbaf6bb1c7fed7c8af8
  }
}
