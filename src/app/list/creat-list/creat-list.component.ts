import { Component, OnInit } from '@angular/core';
import {ListModel} from './list-model';
import {MatDialogRef} from '@angular/material/dialog';
import {BoardService} from '../../board/board.service';
import {ListService} from '../list.service';
import {BoardModel} from '../../shared/board-create/board-model';

@Component({
  selector: 'app-creat-list',
  templateUrl: './creat-list.component.html',
  styleUrls: ['./creat-list.component.css']
})
export class CreatListComponent implements OnInit {
  listName: string;
  newList: ListModel;

  constructor(public dialogRef: MatDialogRef<CreatListComponent>,
              private listService: ListService) { }

  ngOnInit(): void {
    this.listName = '';
    this.newList = new ListModel();
  }

  // tslint:disable-next-line:typedef
  createList() {
    this.newList.listName = this.listName;
    this.listService.creatList(this.newList)
    //   .subscribe(data => {
    //   console.log(data);
    //   alert('Created');
    // })
    ;
    this.dialogRef.close();
  }
}
