import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const ELEMENT_SELECTOR = {
  USER_NAME: 'input_Username',
  PASSWORD: 'input_Password',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading = false;
  constructor(private router: Router) {
    // this.account = JSON.parse(localStorage.getItem('USER'));
  }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    console.log(this.username);
    this.router.navigate(['/admin']);
  }
}
