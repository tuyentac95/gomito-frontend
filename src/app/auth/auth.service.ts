import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from './signup/signup-request';
import {Observable} from 'rxjs';
import {LoginRequest} from './login/login-request';
import {ChangePasswordRequest} from '../change-password/change-password-request';
import {LoginRespponse} from './login/login-respponse';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post('http://localhost:8080/auth/signup', signupRequest,
      {responseType: 'text'});
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginRespponse>('http://localhost:8080/auth/login', loginRequest)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

  // tslint:disable-next-line:typedef
  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }

  // refresfToken() {
  //   return this.http.post<LoginRespponse>()
  // }

  // tslint:disable-next-line:typedef
  changePassword(changePwRequest: ChangePasswordRequest) {
    console.log(changePwRequest);
  }
  // tslint:disable-next-line:typedef
  getUserName() {
    return this.localStorage.retrieve('username');
  }

  // tslint:disable-next-line:typedef
  private getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
}
