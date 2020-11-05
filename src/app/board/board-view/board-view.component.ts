import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  US: GList = {
    name: 'US',
    data: [
      'Get to work',
      'Pick up groceries',
      'Go home',
    ]
  };

  TODO: GList = {
    name: 'TO DO',
    data: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
      'Check e-mail',
      'Walk dog'
    ]
  };

  DOING: GList = {
    name: 'DOING',
    data: [
      'Write letter',
      'Cooking'
    ]
  };

  REVIEW: GList = {
    name: 'REVIEW',
    data: [
      'Write letter',
      'Cooking'
    ]
  };

  DONE: GList = {
    name: 'DONE',
    data: [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Eat breakfast'
    ]
  };

  test = [
    this.US,
    this.TODO,
    this.DOING,
    this.REVIEW,
    this.DONE
  ];

  constructor() { }

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
}
