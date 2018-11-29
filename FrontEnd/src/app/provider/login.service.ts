import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogInRes } from '../model/loginRes';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const url = 'https://dptore.herokuapp.com/user';
    const body = JSON.stringify({
      nameUser: username,
      userPassword: password,
    });
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.post<LogInRes>(url, body, { headers });
  }
}
