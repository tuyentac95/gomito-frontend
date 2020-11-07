import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {ListUpdateComponent} from '../../list/list-update/list-update.component';
import {ListModel} from '../../list-model';
import {ActivatedRoute} from '@angular/router';
import {ListService} from '../../list/list.service';
import {CardService} from '../../card/card.service';
import {GCard} from '../../gCard';
import {throwError} from 'rxjs';
import {CreatListComponent} from '../../list/creat-list/creat-list.component';
import {CreateCardComponent} from '../../card/create-card/create-card.component';
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit {

  listModels: ListModel[];

  constructor(public create: MatDialog,
              private route: ActivatedRoute,
              public createList: MatDialog,
              private listService: ListService,
              private cardService: CardService) {
  }

  ngOnInit(): void {
    this.listModels = [];
    this.getList();
  }

  // tslint:disable-next-line:typedef
  dropCard(event: CdkDragDrop<GCard[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.cardService.updateIndx(event.container.data).subscribe(data => {
        console.log('Update Card Index Success');
      }, error => {
        throwError(error);
      });
    } else {
      console.log('check previous: ');
      console.log(event.previousContainer.data);
      console.log('check: ');
      console.log(event.container.data);
      console.log('check list id: ');
      const containerId = Number(event.container.id.substring(14)) - 1;
      console.log(this.listModels[containerId].listId);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // tslint:disable-next-line:typedef
  dropList(event: CdkDragDrop<ListModel[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // console.log(event.container.data);
    this.listService.updateIndex(event.container.data)
      .subscribe(data => {
      console.log('Update Index OK');
    }, error => {
      throwError(error);
    })
    ;
  }

  openCreateList(): void {
    const newList: ListModel = {
      listName: '',
      boardId: this.route.snapshot.params['boardId'],
      cards: []
    };
    const createList = this.create.open(CreatListComponent, {
      data: newList,
      width: '250px'
    });
    createList.afterClosed().subscribe(result => {
      this.listService.creatList(result).subscribe(data => {
        newList.listIndex = data.listIndex;
        newList.listId = data.listId;
        this.listModels.push(newList);
      });
    });
  }

  openCreateCard(id: number, index: number): void {
    const newCard: GCard = {
      cardName: '',
      listId: id
    };
    const createCard = this.create.open(CreateCardComponent, {
      data: newCard,
      width: '250px'
    });
    const $this = this;
    createCard.afterClosed().subscribe(result => {
      $this.cardService.creatCard(result).subscribe(data => {
        newCard.cardIndex = data.cardIndex;
        newCard.cardId = data.cardId;
        $this.listModels[index].cards.push(newCard);
      });
    });
  }

  openEditList(id: number, name: string): void {
      const updateList: ListModel = {
        listId: id,
        listName: name
      };
      const editList = this.create.open(ListUpdateComponent, {
        data: {
          list: updateList
        },
        width: '250px',
      });
  }

  // tslint:disable-next-line:typedef
  private getList() {
    // Lấy boardId từ URL
    const id = this.route.snapshot.params.boardId;

    // Gọi ra tất cả list có trong board theo boardId
    this.listService.getListList(id).subscribe(data => {

      // gán this là đối tượng hiện tại cho $this vì trong quá trình bên dưới this có thể được hiểu là một thằng khác
      const $this = this;

      // Data trả về 1 mảng ListModel, vậy duyệt qua từng phần tử để lấy listId
      for (const model of data) {

        // Khởi tạo 1 ListModel mới với cards là listCard của API trả về
        const newListModel: ListModel = {
          boardId: id,
          cards: [],
          listId: model.listId,
          listName: model.listName,
          listIndex: model.listIndex,
        };

        // Thêm ListModel mới vào mảng chính thức
        $this.listModels.push(newListModel);
        const index = $this.listModels.indexOf(newListModel);

        // Với mỗi listId, gọi ra tất cả card có trong list đó
        $this.cardService.getAllCards(model.listId).subscribe(listCard => {
          $this.listModels[index].cards = listCard;
          for (const card of $this.listModels[index].cards) {
            card.listId = model.listId;
          }
        });
      }
    });
  }

  viewCard(cardId: number): void {
    console.log('Selected Card: ' + cardId);
  }
}
