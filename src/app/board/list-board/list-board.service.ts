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
  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) {}

  getBoardList(): Observable<GBoard[]>{
    const id = this.localStorage.retrieve('userId');
    return this.httpClient.get<GBoard[]>('http://10.30.0.75:8080/api/users/' + id);
  }

}
