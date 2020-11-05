import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {CreatListComponent} from '../../list/creat-list/creat-list.component';
import {ListService} from "../../list/list.service";
import {ActivatedRoute} from '@angular/router';
import {CreateCardComponent} from '../../card/create-card/create-card.component';
import {ListModel} from "../../list-model";

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
  listModels: ListModel[];

  constructor(public create: MatDialog,
              private route: ActivatedRoute,
              public createList: MatDialog,
              private listService: ListService) {
    console.log(this.route.snapshot.params['boardId']);
  }

  ngOnInit(): void {
    this.getList();
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
    console.log(event);
    console.log(event.container);
    console.log(event.container.data);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  openCreateList(): void {
    const createList = this.create.open(CreatListComponent, {
      data: {
        route: this.route
      },
      width: '250px'
    });
  }

  openCreateCard(): void {
    const createCard = this.create.open(CreateCardComponent, {
      data: {
        route: this.route
      },
      width: '250px'
    });
  }

  private getList(){
    const id = this.route.snapshot.params['boardId'];
    this.listService.getListList(id).subscribe(data =>{
      this.listModels = data;
    })
  }

}
