import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GCard} from '../gCard';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  creatCard(newCard: GCard): Observable<Object>{
    console.log(newCard);
    return this.httpClient.post('http://10.30.0.75:8080/api/cards/', newCard);
  }

  getAllCards(listId: number): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>('http://10.30.0.75:8080/api/lists/' + listId);
  }
}
