import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-attachment',
  templateUrl: './edit-attachment.component.html',
  styleUrls: ['./edit-attachment.component.css']
})
export class EditAttachmentComponent implements OnInit {

  fileUploads: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
