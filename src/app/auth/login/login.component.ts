import {Component, OnInit} from '@angular/core';
import {LoginRequest} from './login-request';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LocalStorageService} from 'ngx-webstorage';
import {throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    loginForm: FormGroup;
  message: string;


  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    // this.loginRequest.username = this.loginForm.get('username').value;
    // this.loginRequest.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequest).subscribe((data) => {
      // if (data.status === 200){
        this.router.navigateByUrl('/dashboard');
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('userId', data.userId);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
      // } else if (data.status === 301) {
      //   this.message = 'Tài khoản không đúng!';
      //   this.router.navigate(['login']);
      // } else if (data.status === 302) {
      //   this.message = 'Mật khẩu không đúng!';
      //   this.router.navigate(['login']);
      // } else if (data.status === 303) {
      //   this.message = 'Tài khoản hoặc mất khẩu không đúng!';
      //   this.router.navigate(['login']);
      // }

    }, error => {
      throwError(error);
    });
  }
}
