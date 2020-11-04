import { Injectable } from '@angular/core';
import {BoardModel} from '../shared/board-create/board-model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  // tslint:disable-next-line:typedef
  createBoard(newBoard: BoardModel) {
    console.log(newBoard);
  }
}
