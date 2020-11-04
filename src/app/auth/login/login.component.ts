import { Component, OnInit } from '@angular/core';
import {LoginRequest} from "./login-request";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginRequest).subscribe((data) => {
    // this.router.navigate(['']);
    console.log(data);
  });
}

}
