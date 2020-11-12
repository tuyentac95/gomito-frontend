import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocketEndPoint = 'http://localhost:8080/notifications';
  topic = '/topic/notify/';
  stompClient: any;
  fromUser;

  constructor() {
  }

  $connect(): void {
    console.log('Initialize webSocket Connection...');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    console.log(this.fromUser + ' connecting to server...');
  }

  $disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnect');
  }

  errorCallBack(error): void {
    console.log(error);
    setTimeout(() => {
      this.$connect();
    }, 5000);
  }

  $sendAll(cardId: number, msg: string): void {
    console.log('Send notification to all members');
    this.stompClient.send('/app/notify/' + cardId, {}, JSON.stringify({
      senderName: this.fromUser,
      message: this.fromUser + msg
    }));
  }

  $sendOne(cardId: number, msg: string): void {
    // console.log('Sending notification to ')
  }
}
