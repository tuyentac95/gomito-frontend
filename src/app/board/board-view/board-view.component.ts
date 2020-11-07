import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {ListUpdateComponent} from '../../list/list-update/list-update.component';
import {ListModel} from '../../list-model';
import {ActivatedRoute} from '@angular/router';
import {ListService} from '../../list/list.service';
import {CardService} from '../../card/card.service';
import {GCard} from '../../gCard';
import {CreatListComponent} from '../../list/creat-list/creat-list.component';
import {CreateCardComponent} from '../../card/create-card/create-card.component';

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
    console.log(this.route.snapshot.params.boardId);
  }

  ngOnInit(): void {
    this.listModels = [];
    this.getList();
  }

  // tslint:disable-next-line:typedef
  dropCard(event: CdkDragDrop<GCard[]>) {
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
  dropList(event: CdkDragDrop<ListModel[]>) {
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

  openCreateCard(id: number): void {
    const newCard: GCard = {
      cardName: '',
      listId: id
    };
    const createCard = this.create.open(CreateCardComponent, {
      data: {
        card: newCard
      },
      width: '250px'
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
        console.log(model);

        // Khởi tạo 1 ListModel mới với cards là listCard của API trả về
        const newListModel: ListModel = {
          boardId: id,
          cards: [],
          listId: model.listId,
          listName: model.listName
        };

        // Thêm ListModel mới vào mảng chính thức
        $this.listModels.push(newListModel);
        const index = $this.listModels.indexOf(newListModel);

        // Với mỗi listId, gọi ra tất cả card có trong list đó
        $this.cardService.getAllCards(model.listId).subscribe(listCard => {
          console.log(listCard);
          $this.listModels[index].cards = listCard;
        });
      }
    });
  }

  viewCard(cardId: number): void {
    console.log('Selected Card: ' + cardId);
  }


}
