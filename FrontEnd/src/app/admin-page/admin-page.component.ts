import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const ELEMENT_SELECTOR = {
  USER_NAME: 'input_Username',
  PASSWORD: 'input_Password',
};
const PAGE = {
  EMPLOYEE: 'employee',
  MERCHANDISE: 'merchandise',
  CUSTOMER: 'customer',
  REPORT: 'report',
  WELLCOME: 'wellcome',
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  clicked = false;
  page = PAGE.WELLCOME;
  PAGE = PAGE;
  constructor(private router: Router) {
    // this.account = JSON.parse(localStorage.getItem('USER'));
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
     // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
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
  }
}
