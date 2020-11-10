import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GUser} from './GUser';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<GUser> {
    return this.http.get<GUser>('http://localhost:8080/api/users');
  }

  getAllMembers(boardId: number): Observable<GUser[]> {
    return this.http.get<GUser[]>('http://localhost:8080/api/boards/' + boardId + '/get-members');
  }
}
