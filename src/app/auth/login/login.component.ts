import {Component, OnInit} from '@angular/core';
import {LoginRequest} from './login-request';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LocalStorageService} from 'ngx-webstorage';
import {throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WebSocketService} from '../../notification/web-socket-service';

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


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private localStorage: LocalStorageService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.localStorage.clear();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe(params => {
      if (params.isRegistered) {
        this.openSnackBar();
      }
    });
  }

  login(): void {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest).subscribe((data) => {
      if (data.status === 200) {
        this.router.navigate(['/dashboard'], {queryParams: {isLogin: 'true'}});
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('userId', data.userId);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        // bật socket
        const ws = this.webSocketService;
        const $this = this;
        ws.fromUser = data.username;
        ws.$connect();
        // tslint:disable-next-line:only-arrow-functions typedef
        ws.stompClient.connect({}, function(frame) {
          console.log('connected to: ' + frame);
          // lắng nghe các tín hiệu từ server
          // tslint:disable-next-line:only-arrow-functions typedef
          ws.stompClient.subscribe(ws.topic + ws.fromUser, function(response) {
            const newNotification = JSON.parse(response.body);
            console.log(newNotification);
            ws.hasNewNotification = String(Number(ws.hasNewNotification) + 1);
            console.log(ws.hasNewNotification);
            $this.alertNotification(newNotification);
          });
        }, ws.errorCallBack);
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

  openSnackBar(): void {
    this.snackBar.open('Register successful! Please Check your inbox for activation email!', 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-class']
    });
  }

  public alertNotification(notification): void {
    this.snackBar.open(notification.message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-class']
    });
  }
}
