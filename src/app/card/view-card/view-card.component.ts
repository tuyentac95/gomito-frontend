import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';
import {GUser} from '../../user/GUser';
import {CardService} from '../card.service';
import {MatDialog} from '@angular/material/dialog';
import {AddAttachmentComponent} from '../../attachment/add-attachment/add-attachment.component';
import {AttachmentService} from '../../attachment/service/attachment.service';
import {Attachment} from '../../attachment';
import {CommentService} from '../../comment/comment.service';
import {Comment} from '../../comment';
import {Glabel} from '../../glabel';
import {LabelService} from '../../label/label.service';
import {ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {
  members: GUser[];
  cardId: number;
  attachments: Attachment[];
  comment: Comment[];

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              private cardService: CardService,
              private attachmentService: AttachmentService,
              private create: MatDialog,
              private commentService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: {
                card: GCard,
                labels: Glabel[],
                members: GUser[],
                content: Comment[],
              },
              private labelService: LabelService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cardId = this.data.card.cardId;
    const $this = this;
    this.getAllAttachments(this.cardId);
    this.getAllComments(this.cardId);
    this.cardService.getMembersOfCard(this.cardId).subscribe(result => {
      $this.members = result;
    }, err => {
      throwError(err);
    });
  }
  private getAllComments(cardId: number): void {
    this.commentService.getCommentByCardId(cardId).subscribe(result => {
      this.comment = result;
    }, err => {
      throwError(err);
    });
  }
  private getAllAttachments(cardId: number): void {
    this.attachmentService.getAttachment(cardId).subscribe(result => {
      console.log('check result');
      this.attachments = result;
      console.log(result);
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

  // tslint:disable-next-line:typedef
  addAttachment() {
    const addAttachment = this.create.open(AddAttachmentComponent, {
      data: {
        cardId: this.cardId
      },
      height: '453px',
      width: '305px'
    });
    addAttachment.afterClosed().subscribe(() => {
      console.log('close box check');
      this.getAllAttachments(this.cardId);
    });
  }
  addLabelToCard(label: Glabel): void {
    // @ts-ignore
    const updateCard: GCard = {
      cardId: this.data.card.cardId
    };
    const $this = this;
    this.cardService.addLabelToCard(label.labelId, updateCard).subscribe(data => {
    }, err => {
      if (err.status === 200) {
        $this.data.card.labels.push(label);
        console.log('Đã xong việc thêm label');
      }
      console.log(err);
    });
  }

  // tslint:disable-next-line:typedef
  createComment(cont) {
    const createContend: Comment = {
      content: cont.content,
      cardId: this.cardId,
    };
    console.log(createContend);
    this.commentService.createComment(createContend).subscribe(data => {
    });
  }
}
