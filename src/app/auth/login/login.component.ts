import {Component, OnInit} from '@angular/core';
import {LoginRequest} from './login-request';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LocalStorageService} from 'ngx-webstorage';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginRequest).subscribe((data) => {
      this.router.navigateByUrl('/dashboard');
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);
    }, error => {
      throwError(error);
    });
  }

}
