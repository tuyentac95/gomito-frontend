import { Component, OnInit } from '@angular/core';
import {SignupRequest} from './signup-request';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequest: SignupRequest;
  signupForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
    this.signupRequest = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });
  }

  signup(): void{
    this.signupRequest.username = this.signupForm.get('username').value;
    this.signupRequest.email = this.signupForm.get('email').value;
    this.signupRequest.password = this.signupForm.get('password').value;
    this.authService.signup(this.signupRequest).subscribe((data) => {
      this.router.navigateByUrl('login');
      console.log(data);
    });
  }
}
