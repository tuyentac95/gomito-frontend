import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from './signup/signup-request';
import {Observable} from 'rxjs';
import {LoginRequest} from './login/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post('http://localhost:8080/auth/signup', signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<Object> {
    return  this.http.post('http://localhost:8080/auth/login', loginRequest);
  }
}
