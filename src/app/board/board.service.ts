import { Injectable } from '@angular/core';
import {BoardModel} from '../shared/board-create/board-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) { }

  // tslint:disable-next-line:typedef
  createBoard(newBoard: BoardModel): Observable<Object> {
    // const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.retrieve('authenticationToken'));
    return this.http.post('http://localhost:8080/api/boards/', newBoard);
  }
}
