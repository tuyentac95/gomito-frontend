import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BoardCreateComponent} from '../board-create/board-create.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public createForm: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateForm(): void {
    const dialogRef = this.createForm.open(BoardCreateComponent, {
      width: '500px'
    });
  }
}
