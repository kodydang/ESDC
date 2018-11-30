import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  } from '@angular/forms';
import { LogInRes } from '../model/loginRes';
import { LoginService } from '../provider/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading = false;
  loginForm: FormGroup;
  submitted = false;
  data: LogInRes;
  isSuccess = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('storeId');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.isSuccess = false;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.username, this.password).subscribe((datas) => {
      this.data = datas;
      if (this.data.status === 'SUCCESS') {
        this.isLoading = true;
        this.router.navigate(['/admin']);
        window.location.reload();
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('role', this.data.data.roleName);
        sessionStorage.setItem('employeeId', `${this.data.data.employee}`);
        sessionStorage.setItem('storeId', this.data.data.storeId.toString());
      } else {
        this.isSuccess = true;
      }
    });
  }
}
