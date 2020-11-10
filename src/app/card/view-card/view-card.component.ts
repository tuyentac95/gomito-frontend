import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GCard) { }

  ngOnInit(): void {
  }

}
