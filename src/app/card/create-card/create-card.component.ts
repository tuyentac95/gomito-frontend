import {Component, Inject, OnInit} from '@angular/core';
import {GCard} from '../../gCard';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListService} from '../../list/list.service';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  cardName: string;
  newCard: GCard;

  constructor(public dialogRef: MatDialogRef<CreateCardComponent>,
              private cardService: CardService,
              @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute}) {
    this.newCard = new GCard();
    this.newCard.listId = Number(data.route.snapshot.params.listId);
  }

  ngOnInit(): void {
    this.cardName = '';
  }

  // tslint:disable-next-line:typedef
  createcard() {
    this.newCard.cardName = this.cardName;
    this.cardService.creatCard(this.newCard).subscribe(data => {
      console.log(data);
      alert('Created');
    });
    this.dialogRef.close();
  }
}
