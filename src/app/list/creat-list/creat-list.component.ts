import {Component, Inject, OnInit} from '@angular/core';
import {ListModel} from '../../list-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BoardService} from '../../board/board.service';
import {ListService} from '../list.service';
import {BoardModel} from '../../shared/board-create/board-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-creat-list',
  templateUrl: './creat-list.component.html',
  styleUrls: ['./creat-list.component.css']
})
export class CreatListComponent implements OnInit {
  listName: string;
  newList: ListModel;

  constructor(public dialogRef: MatDialogRef<CreatListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ListModel) {
    this.newList = data;
    console.log('check data list');
    console.log(this.newList);
  }

  ngOnInit(): void {
    this.listName = '';
  }

}
