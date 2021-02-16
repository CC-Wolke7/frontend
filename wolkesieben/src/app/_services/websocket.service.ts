import {Injectable, isDevMode} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Message} from '../_objects/message';
import {User} from '../_objects/user';
import {Chat} from '../_objects/chat';
import {AppService} from "./app.service";

export enum WebSocketEventName {
  AuthRequest = 'WS_AUTH_REQUEST',
  AuthResponse = 'WS_AUTH_RESPONSE',
  CreateMessage = 'CREATE_MESSAGE',
  ReceivedMessage = 'MESSAGE_CREATED'
}

export class WsAuthRequestPayload {
  readonly token: string;
}

export class WebSocketEvent<T> {
  event: WebSocketEventName;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocketSubject<any>;
  chat: Chat;

  constructor() {}

  getUrl() {
    return `${isDevMode() ? 'ws://localhost:3000' : 'wss://chat.cc-wolkesieben.de'}`;
  }

  init() {
    if (this.ws && !this.ws.closed) {
      this.close();
    }
    this.ws = webSocket(this.getUrl());

    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    const authReqEvt: WebSocketEvent<WsAuthRequestPayload> = {
      event: WebSocketEventName.AuthRequest,
      data: {token: user.jwtToken.access}
    };
    this.ws.next(authReqEvt);
  }

  close() {
    this.ws.unsubscribe();
  }

  sendMessage(message: any) {
    const messageReqEvt: WebSocketEvent<Message> = {
      event: WebSocketEventName.CreateMessage,
      data: message
    };
    this.ws.next(messageReqEvt);
  }
}
