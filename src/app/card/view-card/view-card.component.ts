import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';
import {GUser} from '../../user/GUser';
import {CardService} from '../card.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {
  members: GUser[];

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              private cardService: CardService,
              @Inject(MAT_DIALOG_DATA) public data: {
                card: GCard,
                members: GUser[]
              }) {
  }

  ngOnInit(): void {
    const cardId = this.data.card.cardId;
    const $this = this;
    this.cardService.getMembersOfCard(cardId).subscribe(result => {
      $this.members = result;
    }, err => {
      throwError(err);
    });
  }

}
