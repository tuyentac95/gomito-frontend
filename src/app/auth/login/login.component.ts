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
  messageUsername: string;
  messagePassword: string;


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
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest).subscribe((data) => {
      if (data.status === 200){
        this.router.navigateByUrl('/dashboard');
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('userId', data.userId);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
      } else if (data.status === 404) {
        this.messageUsername = 'Tài khoản không tìm thấy!';
        this.router.navigate(['login']);
      }
    }, error => {
      if (error.status === 403) {
        this.messagePassword = 'Mật khẩu không đúng!';
      }
      throwError(error);
    });
  }
}
