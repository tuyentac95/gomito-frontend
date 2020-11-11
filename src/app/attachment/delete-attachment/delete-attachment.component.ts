import {Component, Inject, Input, OnInit} from '@angular/core';
import {AttachmentService} from '../service/attachment.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ListModel} from '../../list-model';
import {Attachment} from '../../attachment';

@Component({
  selector: 'app-delete-attachment',
  templateUrl: './delete-attachment.component.html',
  styleUrls: ['./delete-attachment.component.css']
})
export class DeleteAttachmentComponent implements OnInit {

  constructor(private attachment: AttachmentService,
              @Inject(MAT_DIALOG_DATA) public data: Attachment) { }

  ngOnInit(): void {
  }


}
