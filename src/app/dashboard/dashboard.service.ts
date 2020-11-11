import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GUser} from '../auth/GUser';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  updateUserAvatar(user: GUser): Observable<GUser> {
    return this.httpClient.put<GUser>('http://localhost:8080/api/users/updateAvatar', user);
  }
}
