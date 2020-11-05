import { Component, OnInit } from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {ChangePasswordRequest} from './change-password-request';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordRequest: ChangePasswordRequest = {
    oldpassword : '',
    newpassword: ''
  };

  constructor(private authService: AuthService) { }
  hide = true;


  ngOnInit(): void {
  }

  changePassword(): void {
    this.authService.changePassword(this.changePasswordRequest);
  }
}
