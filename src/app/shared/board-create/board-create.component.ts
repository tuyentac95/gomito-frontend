import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BoardModel} from './board-model';
import {BoardService} from '../../board/board.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {
  boardName: '';
  newBoard: BoardModel;

  constructor(public dialogRef: MatDialogRef<BoardCreateComponent>,
              private boardService: BoardService,
              private router: Router) { }

  ngOnInit(): void {
    this.boardName = '';
    this.newBoard = new BoardModel();
  }

  // tslint:disable-next-line:typedef
  createBoard() {
    this.newBoard.boardName = this.boardName;
    this.boardService.createBoard(this.newBoard).subscribe(data => {
      // @ts-ignore
      this.router.navigateByUrl('redirect');
      console.log(data);
      alert('Created');
    });
    this.dialogRef.close();
  }
}
