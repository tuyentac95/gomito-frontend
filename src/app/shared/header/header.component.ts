import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BoardCreateComponent} from '../board-create/board-create.component';
import {AuthService} from '../../auth/auth.service';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public createForm: MatDialog,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  openCreateForm(): void {
    const dialogRef = this.createForm.open(BoardCreateComponent, {
      width: '500px'
    });
  }

  logout(): void {
    this.authService.logout().subscribe(data => {
      console.log('Logout');
    }, error => {
      throwError(error);
    });
    this.router.navigateByUrl('login');
  }

  toDashboard(): void {
    this.router.navigateByUrl('dashboard');
  }
}
