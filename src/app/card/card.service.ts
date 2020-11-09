import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GCard} from '../gCard';
import {Observable} from 'rxjs';
import {ListModel} from "../list-model";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) {
  }

  creatCard(newCard: GCard): Observable<GCard> {
    return this.httpClient.post<GCard>('http://localhost:8080/api/cards/', newCard);
  }

  getAllCards(listId: number): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>('http://localhost:8080/api/lists/' + listId);
  }

  updateIndex(data: GCard[]): Observable<any> {
    const updateCards: GCard[] = [];
    for (const card of data) {
      const newCard: GCard = {
        cardId: card.cardId,
        cardIndex: data.indexOf(card)
      };
      updateCards.push(newCard);
    }
    console.log(updateCards);
    return this.httpClient.post('http://localhost:8080/api/cards/updateIndex', updateCards);
  }

  moveCardToAnotherList(data: GCard[], newListId: number): Observable<any> {
    for (const card of data) {
      card.listId = newListId;
      card.cardIndex = data.indexOf(card);
      console.log(card);
    }
    return this.httpClient.post('http://localhost:8080/api/cards/updateIndexOfCardInAnotherList', data);
  }
  editCard(updateCard: GCard): Observable<GCard>{
    // console.log('check4: ' + updateCard);
    return this.httpClient.put<GCard>('http://localhost:8080/api/card/update/', updateCard);
  }
}
