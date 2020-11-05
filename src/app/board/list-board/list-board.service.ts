import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GBoard} from "../../gboard";
import {Observable} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class ListBoardService {
  private baseURL = 'http://localhost:8080/api/users/';
  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) {}

  getBoardList(): Observable<GBoard[]>{
    const id = this.localStorage.retrieve('userId');
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.retrieve('authenticationToken'));
    return this.httpClient.get<GBoard[]>('http://localhost:8080/api/users/' + id, {headers: header});
  }

}
