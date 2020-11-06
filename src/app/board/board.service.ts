import { Injectable } from '@angular/core';
import {BoardModel} from '../shared/board-create/board-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import {Route, Router} from '@angular/router';
import {GBoard} from '../gboard';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) { }

  // tslint:disable-next-line:typedef
  createBoard(newBoard: BoardModel): Observable<Object> {
    // const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.retrieve('authenticationToken'));
    return this.httpClient.post('http://10.30.0.75:8080/api/boards/', newBoard);
  }

  getBoardList(): Observable<GBoard[]>{
    const id = this.localStorage.retrieve('userId');
    return this.httpClient.get<GBoard[]>('http://10.30.0.75:8080/api/users/' + id);
  }
}
