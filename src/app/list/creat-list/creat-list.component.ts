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
              private listService: ListService,
              @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute}) {
    this.newList = new ListModel();
    this.newList.boardId = Number(data.route.snapshot.params['boardId']);
  }

  ngOnInit(): void {
    this.listName = '';
  }

  // tslint:disable-next-line:typedef
  createList() {
    this.newList.listName = this.listName;
    this.listService.creatList(this.newList).subscribe(data => {
      console.log(data);
      alert('Created');
    });
    this.dialogRef.close();
  }
}
