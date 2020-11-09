import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GCard) {
  }

  ngOnInit(): void {
  }
}
