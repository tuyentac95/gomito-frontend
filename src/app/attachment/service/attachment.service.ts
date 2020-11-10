import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Attachment} from '../../attachment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private httpClient: HttpClient,
              private router: Router ) {}

              getAttachment(id: number): Observable<Attachment> {
    return this.httpClient.get<Attachment>(' http://localhost:8080/api/cards/' + id);
  }

  createAttachment(newAttachment: Attachment): Observable<Attachment>{
    return this.httpClient.post<Attachment>('http://localhost:8080/api/attachments/', newAttachment);
  }

  editAttachment(editAttachment: Attachment): Observable<Attachment>{
    return this.httpClient.put<Attachment>('http://localhost:8080/api/attachments/update', editAttachment);
  }

  deleteAttachment(deleteAttachment: Attachment): Observable<Attachment>{
    return this.httpClient.delete<Attachment>
    ('http://localhost:8080/api/attachments/delete/' + deleteAttachment.attachmentId);
  }
}

