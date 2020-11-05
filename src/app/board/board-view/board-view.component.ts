import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {CreatListComponent} from '../../list/creat-list/creat-list.component';

export class GList{
  name: string;
  data: string[];
}

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit {

  todo: GList = {
    name: 'To do',
    data: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
      'Check e-mail',
      'Walk dog'
    ]
  };

  doing: GList = {
    name: 'Doing',
    data: [
      'Write letter',
      'Cooking'
    ]
  };

  done: GList = {
    name: 'Done',
    data: [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Eat breakfast'
    ]
  };

  test = [
    this.todo,
    this.doing,
    this.done
  ];

  constructor(public createList: MatDialog) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  dropCard(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // tslint:disable-next-line:typedef
  dropList(event: CdkDragDrop<GList[]>) {
    console.log(event.container);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  openCreateList(): void {
    const createList = this.createList.open(CreatListComponent, {
      width: '250px'
    });
  }
}
