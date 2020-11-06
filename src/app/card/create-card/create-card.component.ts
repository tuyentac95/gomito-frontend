import {Component, Inject, OnInit} from '@angular/core';
import {ListModel} from "../../list-model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CardService} from "../card.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  cardName: string;
  newCard: ListModel;


  constructor(public dialogRef: MatDialogRef<CreateCardComponent>,
              private cardService: CardService,
  @Inject(MAT_DIALOG_DATA) data: {Route: ActivatedRoute}) {
     this.newCard = new ListModel();
     this.newCard.boardId = Number(data.route.snapshot.params['listId']);
   }

  ngOnInit(): void {
    this.cardName = '';
  }
  createCard() {
    this.newCard.cardName = this.cardName;
    this.cardService.createCard(this.newCard).subscribe(data =>{console.log(data);
    alert('Created');
    });
    this.dialogRef.close();
  }
}
