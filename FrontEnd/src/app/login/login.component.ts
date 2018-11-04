import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
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
  loginForm: FormGroup;
  submitted = false;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    // this.account = JSON.parse(localStorage.getItem('USER'));
  }

  ngOnInit() {
      this.loginForm = new FormGroup({
      username:new FormControl ('', Validators.required),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.username);
    this.router.navigate(['/admin']);
  }
}
