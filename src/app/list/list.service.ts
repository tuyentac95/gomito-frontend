import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListModel} from '../list-model';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) {}

  creatList(newList: ListModel): Observable<Object>{
    console.log(newList);
    return this.httpClient.post('http://localhost:8080/api/lists/', newList);
  }

  // @ts-ignore
  getListList(id: number): Observable<ListModel[]>{
    return this.httpClient.get<ListModel[]>('http://localhost:8080/api/boards/' +id);
  }
}
