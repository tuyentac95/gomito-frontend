import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from '../../file-upload';
import {UploadFileService} from '../upload-file.service';

@Component({
  selector: 'app-detail-upload',
  templateUrl: './detail-upload.component.html',
  styleUrls: ['./detail-upload.component.css']
})
export class DetailUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
