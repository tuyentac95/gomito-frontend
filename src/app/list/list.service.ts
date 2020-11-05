import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListModel} from './creat-list/list-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  creatList(newList: ListModel): Observable<Object>{
    console.log(newList);
    return this.httpClient.post('http://localhost:8080/api/lists/', newList);
  }
}
