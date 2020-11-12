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

  $send(user: string, text: string, broker: string): void {
    this.stompClient.send(broker + user, {}, JSON.stringify({
      from: this.fromUser,
      message: text
    }));
  }
}
