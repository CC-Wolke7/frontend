import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../_objects/message';
import {ChatService} from '../../_services/chat.service';
import {Chat} from '../../_objects/chat';
import {User} from '../../_objects/user';
import {WebSocketEventName, WebsocketService} from '../../_services/websocket.service';
import {AppService} from "../../_services/app.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-offer-chat',
  templateUrl: './offer-chat.component.html',
  styleUrls: ['./offer-chat.component.scss'],
})
export class OfferChatComponent implements OnInit, OnDestroy {

  @Input() owner: User;

  messages: Message[] = [];
  newMessage = '';
  chat: Chat;

  constructor(private chatService: ChatService,
              private websocketService: WebsocketService,
              private userService: UserService) { }

  async ngOnInit() {
    this.websocketService.init();
    this.websocketService.ws.subscribe((response) => {
      if (response.event === WebSocketEventName.ReceivedMessage) {
        this.messages.push(response.data);
      } else if (response.event !== WebSocketEventName.AuthResponse || true) { // fixme remove || true
        console.error(response);
      }
    });
  }

  async getMessages() {
    this.messages = await this.chatService.getMessages(this.chat.uuid);
  }

  ngOnDestroy() {
    this.websocketService.close();
  }

  async sendMessage() {
    const chats = await this.chatService.getChats(this.owner.uuid);
    if (chats.length === 0) {
      this.chat = await this.chatService.pushChat(this.owner.uuid);
    } else {
      this.chat = chats[0];
    }
    this.websocketService.sendMessage({chat: this.chat.uuid, message: this.newMessage});
    this.newMessage = '';
  }

}
