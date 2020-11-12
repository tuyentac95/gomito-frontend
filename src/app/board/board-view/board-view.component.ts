import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {ListUpdateComponent} from '../../list/list-update/list-update.component';
import {ListModel} from '../../list-model';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../list/list.service';
import {CardService} from '../../card/card.service';
import {GCard} from '../../gCard';
import {throwError} from 'rxjs';
import {CreatListComponent} from '../../list/creat-list/creat-list.component';
import {CreateCardComponent} from '../../card/create-card/create-card.component';
import {ViewCardComponent} from '../../card/view-card/view-card.component';
import {Glabel} from '../../glabel';
import {GUser} from '../../user/GUser';
import {LabelService} from '../../label/label.service';
import {UserService} from '../../user/user.service';


@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit {
  cards: GCard[];
  newLabel: Glabel = new Glabel();
  labels: Glabel[];
  listModels: ListModel[];
  originList: ListModel[];
  filterLabels: Glabel[];
  filterMembers: GUser[];
  showFiller = false;
  listMembers: GUser[];
  memberInfo: string;
  boardId: number;

  constructor(public create: MatDialog,
              private route: ActivatedRoute,
              public createList: MatDialog,
              private listService: ListService,
              private cardService: CardService,
              private labelService: LabelService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.params.boardId);
    this.listModels = [];
    this.originList = [];
    this.getList();
    this.getListModels();

    this.filterLabels = [];
    this.filterMembers = [];
    this.listMembers = [];
    this.getLabel();
    this.getAllMembers(this.boardId);
  }

  // tslint:disable-next-line:typedef
  dropCard(event: CdkDragDrop<GCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.cardService.updateIndex(event.container.data).subscribe(data => {
        console.log('Update Card Index Success');
      }, err => {
        throwError(err);
      });
    } else {
      const preContainerData = event.previousContainer.data;
      const containerData = event.container.data;
      const containerId = Number(event.container.id.substring(14));

      transferArrayItem(preContainerData,
        containerData,
        event.previousIndex,
        event.currentIndex);

      // const newListId = this.listModels[containerId].listId;
      let newListId = 0;
      for (const list of this.listModels) {
        if (list.dropListId === containerId) {
          newListId = list.listId;
          break;
        }
      }

      if (preContainerData.length > 0) {
        this.cardService.updateIndex(preContainerData).subscribe(data => {
          console.log('Update Previous List Card OK');
        }, err => {
          throwError(err);
        });
      }

      this.cardService.moveCardToAnotherList(containerData, newListId).subscribe(data => {
        console.log('Update New List Card');
      }, err => {
        throwError(err);
      });
    }
  }

  // tslint:disable-next-line:typedef
  dropList(event: CdkDragDrop<ListModel[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.listService.updateIndex(event.container.data)
      .subscribe(data => {
        console.log('Update Index OK');
      }, err => {
        throwError(err);
      })
    ;
  }

  openCreateList(): void {
    const newList: ListModel = {
      listName: '',
      boardId: this.boardId,
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
      data: updateList,
      width: '250px'
    });
    const $this = this;
    editList.afterClosed().subscribe(result => {
      $this.listService.editList(result).subscribe(data => {
        console.log(data);
        alert('Update success!!!');
        for (const list of $this.listModels) {
          if (list.listId === id) {
            list.listName = data.listName;
          }
        }
      }, err => {
        throwError(err);
      });
    });
  }

  // tslint:disable-next-line:typedef
  private getList() {
    // Lấy boardId từ URL
    const id = this.boardId;

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
          dropListId: 0
        };

        // Thêm ListModel mới vào mảng chính thức
        $this.originList.push(newListModel);
        const index = $this.originList.indexOf(newListModel);
        newListModel.dropListId = index + 1;

        // Với mỗi listId, gọi ra tất cả card có trong list đó
        $this.cardService.getAllCards(model.listId).subscribe(listCard => {
          $this.originList[index].cards = listCard;
          for (const card of $this.originList[index].cards) {
            card.listId = model.listId;
          }
        });
      }
    });
  }

  viewCard(id: number, listIndex: number): void {
    const updateCard: GCard = {
      labels: [],
      cardId: id,
      cardName: '',
      description: '',
      members: []
    };

    const $this = this;
    $this.cardService.getCard(id).subscribe(data => {
      updateCard.cardName = data.cardName;
      updateCard.description = data.description;
      updateCard.labels = data.labels;
      updateCard.members = data.members;
    });

    const viewCard = this.create.open(ViewCardComponent, {
      data: {
        card: updateCard,
        labels: this.labels,
        members: this.listMembers
      },
      height: '750px',
      width: '750px'
    });

    viewCard.afterClosed().subscribe(data => {
      console.log(data);
      $this.cardService.editCard(data).subscribe(result => {
        console.log($this.listModels[listIndex].cards[result.cardIndex]);
        $this.listModels[listIndex].cards[result.cardIndex].cardName = result.cardName;
        $this.listModels[listIndex].cards[result.cardIndex].members = data.members;
        alert('Update success');
        console.log(result);
      });
    });
  }

  // tslint:disable-next-line:typedef
  private getLabel() {
    // Lấy boardId từ URL
    const id = this.route.snapshot.params.boardId;

    // Gọi ra tất cả label có trong board theo boardId
    this.labelService.getAllLabels(id).subscribe(data => {
      this.labels = data;
    });
  }

  private getAllMembers(boardId: number): void {
    this.userService.getAllMembers(boardId).subscribe(data => {
      this.listMembers = data;
    }, err => {
      throwError(err);
    });
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }

  inviteMember(): void {
    const info = this.memberInfo;
    const member: GUser = {
      username: null,
      email: null
    };
    if (this.validateEmail(info)) {
      member.email = info;
    } else {
      member.username = info;
    }
    this.userService.inviteMember(member, this.boardId).subscribe(data => {
      alert(data);
    }, err => {
      throwError(err);
    });
  }

  validateEmail(text): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
  }

  saveLabel(): void {
    this.newLabel.boardId = this.boardId;
    this.labelService.createLabel(this.newLabel).subscribe(data => {
      this.labels.push(data);
      console.log(data);
      this.newLabel.labelName = '';
    }, err => console.log(err));
  }

  filterByLabelAndMember(label?: Glabel, member?: GUser): void {
    const $this = this;
    if (label !== null) {
      const i = $this.filterLabels.indexOf(label);
      if (i >= 0) {
        $this.filterLabels.splice(i, 1);
      } else {
        $this.filterLabels.push(label);
      }
    } else {
      const i = $this.filterMembers.indexOf(member);
      if (i >= 0) {
        $this.filterMembers.splice(i, 1);
      } else {
        $this.filterMembers.push(member);
      }
    }
    if ($this.filterLabels.length === 0 && $this.filterMembers.length === 0) {
      $this.listModels = [];
      $this.getListModels();
    } else if ($this.filterMembers.length === 0) {
      console.log($this.filterLabels);
      for (const list of $this.originList) {
        const index = $this.originList.indexOf(list);
        $this.listModels[index].cards = [];
        for (const card of list.cards) {
          for (const label1 of card.labels) {
            for (const checkLabel of $this.filterLabels) {
              if (label1.labelId === checkLabel.labelId && $this.listModels[index].cards.indexOf(card) < 0) {
                $this.listModels[index].cards.push(card);
              }
            }
          }
        }
      }
    } else if ($this.filterLabels.length === 0) {
      console.log($this.filterMembers);
      for (const list of $this.originList) {
        const index = $this.originList.indexOf(list);
        $this.listModels[index].cards = [];
        for (const card of list.cards) {
          for (const mem of card.members) {
            for (const checkMem of $this.filterMembers) {
              if (mem.userId === checkMem.userId && $this.listModels[index].cards.indexOf(card) < 0) {
                $this.listModels[index].cards.push(card);
              }
            }
          }
        }
      }
    } else {
      console.log($this.filterLabels);
      for (const list of $this.originList) {
        const index = $this.originList.indexOf(list);
        $this.listModels[index].cards = [];
        for (const card of list.cards) {
          let checkCardLabel = false;
          for (const label1 of card.labels) {
            for (const checkLabel of $this.filterLabels) {
              if (label1.labelId === checkLabel.labelId) {
                checkCardLabel = true;
              }
            }
          }
          if (checkCardLabel) {
            for (const mem of card.members) {
              for (const checkMem of $this.filterMembers) {
                if (mem.userId === checkMem.userId && $this.listModels[index].cards.indexOf(card) < 0) {
                  $this.listModels[index].cards.push(card);
                }
              }
            }
          }
        }
      }
    }
  }

  private getListModels(): void {
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
          dropListId: 0
        };

        // Thêm ListModel mới vào mảng chính thức
        $this.listModels.push(newListModel);
        const index = $this.listModels.indexOf(newListModel);
        newListModel.dropListId = index + 1;

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
}
