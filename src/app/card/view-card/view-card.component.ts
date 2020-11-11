import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';
import {GUser} from '../../user/GUser';
import {CardService} from '../card.service';
import {throwError} from 'rxjs';
import {Glabel} from "../../glabel";
import {LabelService} from "../../label/label.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {
  members: GUser[];
  cardId: number;

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                card: GCard,
                labels: Glabel[],
                members: GUser[]
              },
              private labelService: LabelService,
              private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit(): void {
    this.cardId = this.data.card.cardId;
    const $this = this;
    this.cardService.getMembersOfCard(this.cardId).subscribe(result => {
      $this.members = result;
    }, err => {
      throwError(err);
    });
  }

  addMemberToCard(member: GUser): void {
    const mem: GUser = {
      userId: member.userId
    };
    const $this = this;
    this.cardService.addMemberToCard(mem, this.cardId).subscribe(result => {
      console.log('OK');
    }, err => {
      console.log(err);
      if (err.status === 200) {
        $this.members.push(member);
      }
      throwError(err);
    });
  }
  addLabelToCard(label: Glabel) {
    // @ts-ignore
    const updateCard: GCard = {
      cardId: this.data.card.cardId
    }
    const $this = this;
    this.cardService.addLabelToCard(label.labelId, updateCard).subscribe(data => {
    },err => {
      if (err.status == 200) {
        $this.data.card.labels.push(label);
        console.log('Đã xong việc thêm label');
      }
      console.log(err)
    });
  }
}
