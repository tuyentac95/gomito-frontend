import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebSocketService {
  webSocketEndPoint = '';
  topic = '';
  stompClient: any;
  fromUser;

  constructor() {
  }

  $connect(){
    console.log('Initialize webSocket Connection...');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    console.log(this.fromUser + ' connecting to chat...');
  }

  $disconnect() {
    if (this.stompClient !== null){
      this.stompClient.disconnect();
    }
    console.log('Disconnect');
  }

  errorCallBack(error){
    console.log(error);
    setTimeout(() => {
      this.$connect();
    }, 5000);
  }

  $send(user: string, text: string, broker: string){
    this.stompClient.send(broker + user, {}, JSON.stringify({
      from: this.fromUser,
      message: text
    }))
  }
}
