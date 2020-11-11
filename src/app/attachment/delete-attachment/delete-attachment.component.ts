import {Component, Input, OnInit} from '@angular/core';
// import {UploadFile} from '../../upload-file';
import {AttachmentService} from '../service/attachment.service';

@Component({
  selector: 'app-delete-attachment',
  templateUrl: './delete-attachment.component.html',
  styleUrls: ['./delete-attachment.component.css']
})
export class DeleteAttachmentComponent implements OnInit {

  // @Input() fileUpload: UploadFile;

  constructor(private attachment: AttachmentService) { }

  ngOnInit(): void {
  }

  // // tslint:disable-next-line:typedef
  // deleteFileUpload(fileUpload) {
  //   this.attachment.deleteFileUpload(fileUpload);
  // }

}
