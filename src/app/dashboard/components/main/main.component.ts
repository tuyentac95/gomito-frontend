import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ListBoardService} from "../../../list-board.service";
import {GBoard} from "../../../gboard";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private userId: number;
  gboards: GBoard[];
  constructor(private listBoardService: ListBoardService,
              private router: Router) {}

  ngOnInit(): void {
    this.getBoard();
  }

  private getBoard(){
    // @ts-ignore
    this.listBoardService.getBoardList().subscribe(data => {
      // console.log(data[0]);
      this.gboards = data;
    })
  }
}
