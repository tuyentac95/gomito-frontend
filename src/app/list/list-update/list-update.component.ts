import {Component, Inject, OnInit} from '@angular/core';
import {ListModel} from '../../list-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListService} from '../list.service';

@Component({
  selector: 'app-list-update',
  templateUrl: './list-update.component.html',
  styleUrls: ['./list-update.component.css']
})
export class ListUpdateComponent implements OnInit {
  listName: string;
  newList: ListModel;

  constructor(public dialogRef: MatDialogRef<ListUpdateComponent>,
              private listService: ListService,
              @Inject(MAT_DIALOG_DATA) data: {list: ListModel}) {
    this.newList = data.list;
    console.log('check1: ' + this.newList.listName);
  }
  ngOnInit(): void {
    this.listName = this.newList.listName;
  }

  // tslint:disable-next-line:typedef
  editListName() {
    this.newList.listName = this.listName;
    console.log('check2: ' + this.newList);
    this.listService.editList(this.newList).subscribe( data => {
      console.log('check3:' + data);
      alert('Update success!!!');
    });
    this.dialogRef.close();
  }
}
