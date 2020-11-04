import { Component, OnInit } from '@angular/core';
import {SignupRequest} from './signup-request';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequest: SignupRequest = {
      username: '',
      email: '',
      password: ''
    };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  signup(){
    this.authService.signup(this.signupRequest).subscribe((data) => {
      // this.router.navigate(['']);
      console.log(data);
    });
  }
}
