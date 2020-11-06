import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GCard} from '../gCard';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  creatCard(newCard: GCard): Observable<GCard>{
    return this.httpClient.post<GCard>('http://localhost:8080/api/cards/', newCard);
  }

  getAllCards(listId: number): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>('http://localhost:8080/api/lists/' + listId);
  }
}
