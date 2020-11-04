import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BoardModel} from './board-model';
import {BoardService} from '../../board/board.service';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {
  boardName: string;
  newBoard: BoardModel;

  constructor(public dialogRef: MatDialogRef<BoardCreateComponent>,
              private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardName = '';
    this.newBoard = new BoardModel();
  }

  // tslint:disable-next-line:typedef
  createBoard() {
    this.newBoard.boardName = this.boardName;
    this.boardService.createBoard(this.newBoard).subscribe(data => {
      console.log(data);
      alert('Created');
    });
    this.dialogRef.close();
  }
}
