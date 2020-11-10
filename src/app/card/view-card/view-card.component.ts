import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';
import {Glabel} from "../../glabel";
import {LabelService} from "../../label/label.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                card: GCard,
                labels: Glabel[]
              },
              private labelService: LabelService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.getLabel();
  }

  // private getLabel() {
  //   // Lấy boardId từ URL
  //   const id = this.route.snapshot.params.boardId;
  //
  //   // Gọi ra tất cả list có trong board theo boardId
  //   this.labelService.getAllLabels(id).subscribe(data => {
  //     this.labels = data;
  //   });
  // }
}
