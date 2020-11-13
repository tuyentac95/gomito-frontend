import {Component, Input, OnInit} from '@angular/core';
import {AttachmentService} from '../service/attachment.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteAttachmentComponent} from '../delete-attachment/delete-attachment.component';
import {EditAttachmentComponent} from '../edit-attachment/edit-attachment.component';
import {Attachment} from '../../attachment';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.css']
})
export class ViewAttachmentComponent implements OnInit {
  @Input() items: Attachment[];
  cardId: number;

  constructor(private attachmentService: AttachmentService,
              private create: MatDialog) {
  }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  openDelete(id: number) {
    const deleteAttach: Attachment = {
      attachmentId: id
    };
    const deleteAttachment = this.create.open(DeleteAttachmentComponent, {
      data: deleteAttach,
      width: '250px'
    });
    deleteAttachment.afterClosed().subscribe(result => {
      console.log('check delete ' + result);
      this.attachmentService.deleteAttachment(result).subscribe(data => {});
    });
  }

  // tslint:disable-next-line:typedef
  openEdit(id: number, name: string) {
    // tslint:disable-next-line:one-variable-per-declaration
    const updateAttachment: Attachment = {
        attachmentId: id,
        attachmentName: name
    };
    const editAttachment = this.create.open(EditAttachmentComponent, {
      data: updateAttachment,
      width: '250px'
    });
    editAttachment.afterClosed().subscribe(result => {
      this.attachmentService.editAttachment(result).subscribe(data => {
        console.log(data);
        alert('Update success!!!');
        for (const attach of this.items) {
          if (attach.attachmentId === id) {
            attach.attachmentName = data.attachmentName;
          }
        }
      }, error => {
        throwError(error);
      });
    });
  }

}
