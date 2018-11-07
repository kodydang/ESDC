import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE } from '../shared/constants';

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
  clicked = false;

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
}
