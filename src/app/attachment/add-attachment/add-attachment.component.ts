import { Component, OnInit } from '@angular/core';
import {AttachmentService} from '../service/attachment.service';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.css']
})
export class AddAttachmentComponent implements OnInit {

  constructor(private attachment: AttachmentService) { }

  ngOnInit(): void {
  }

  // // tslint:disable-next-line:typedef
  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }
  //
  // // tslint:disable-next-line:typedef
  // upload() {
  //   const file = this.selectedFiles.item(0);
  //   this.selectedFiles = undefined;
  //
  //   this.currentFileUpload = new UploadFile(file);
  //   this.attachment.pushFileToStorage(this.currentFileUpload).subscribe(
  //     percentage => {
  //       this.percentage = Math.round(percentage);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
