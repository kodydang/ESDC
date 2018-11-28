import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInRes } from '../model/loginRes';
import { LoginService } from '../provider/login.service';
import { FormsModule }   from '@angular/forms';

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
  loginForm: FormGroup;
  submitted = false;
  data: LogInRes;
  isSuccess = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) {
    // this.account = JSON.parse(localStorage.getItem('USER'));
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
    else {
      this.loginService.login(this.username, this.password).subscribe(datas => {
        this.data = datas;
        if (this.data.status == "SUCCESS") {
          this.isLoading = true;
          console.log(this.username);
          this.router.navigate(['/admin']);
          sessionStorage.setItem('username',this.username);
          sessionStorage.setItem('role',this.data.data.roleName);
        }
        else {
          this.isSuccess = true;
        }
      });
    }
  }
}
