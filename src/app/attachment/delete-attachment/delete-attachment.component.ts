import {Component, Input, OnInit} from '@angular/core';
import {AttachmentService} from '../service/attachment.service';

@Component({
  selector: 'app-delete-attachment',
  templateUrl: './delete-attachment.component.html',
  styleUrls: ['./delete-attachment.component.css']
})
export class DeleteAttachmentComponent implements OnInit {

  constructor(private attachment: AttachmentService) { }

  ngOnInit(): void {
  }


}
