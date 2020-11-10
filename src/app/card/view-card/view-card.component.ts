import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddAttachmentComponent} from '../../attachment/add-attachment/add-attachment.component';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  constructor(private create: MatDialog) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addAttachment() {
    const addAttachment = this.create.open(AddAttachmentComponent, {
      height: '453px',
      width: '305px'
    });
  }

}
