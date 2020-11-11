import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BoardCreateComponent} from '../board-create/board-create.component';
import {AuthService} from '../../auth/auth.service';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {GCard} from '../../gCard';
import {CardService} from '../../card/card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: string;
  cards: GCard[];

  constructor(public createForm: MatDialog,
              private authService: AuthService,
              private router: Router,
              private localStorage: LocalStorageService,
              private cardService: CardService) { }

  ngOnInit(): void {
    this.search = '';
    this.cards = [];
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
    this.localStorage.clear();
    this.router.navigateByUrl('login');
  }

  toDashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  changePw(): void {
    this.router.navigateByUrl('dashboard/change-password');
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }

  searchCard(name: string): void {
    const $this = this;
    $this.cardService.searchCard(name).subscribe(data => {
      $this.cards = data;
      console.log('check search');
      console.log($this.cards);
    });
  }
}
