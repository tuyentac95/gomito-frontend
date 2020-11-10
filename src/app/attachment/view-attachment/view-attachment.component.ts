import { Component, OnInit } from '@angular/core';
import {CreateCardComponent} from '../../card/create-card/create-card.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteAttachmentComponent} from '../delete-attachment/delete-attachment.component';
import {EditAttachmentComponent} from '../edit-attachment/edit-attachment.component';

@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.css']
})
export class ViewAttachmentComponent implements OnInit {

  constructor(private create: MatDialog) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  openDelete() {
    const deleteAttachment = this.create.open(DeleteAttachmentComponent, {
      width: '250px'
    });
  }

  // tslint:disable-next-line:typedef
  openEdit() {
    const editAttachment = this.create.open(EditAttachmentComponent, {
      width: '250px'
    });
  }
}
