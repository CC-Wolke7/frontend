import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../_objects/message';
import {ChatService} from '../../_services/chat.service';
import {Chat} from '../../_objects/chat';
import {User} from '../../_objects/user';
import {WebSocketEventName, WebsocketService} from '../../_services/websocket.service';

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
              private websocketService: WebsocketService) { }

  async ngOnInit() {
    await this.getChat();
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

  async getChat() {
    // todo remove fallback
    if (!this.owner) {
      this.owner = JSON.parse(localStorage.getItem('appUser'));
    }

    const chats = await this.chatService.getChats(this.owner.uuid);
    if (chats.length === 0) {
      this.chat = await this.chatService.pushChat(this.owner.uuid);
    } else {
      this.chat = chats[0];
    }
    // await this.getMessages();
  }

  ngOnDestroy() {
    // this.chatService.closeConnection();
  }

  sendMessage() {
    this.websocketService.sendMessage({chat: this.chat.uuid, message: this.newMessage});
    this.newMessage = '';
  }

}
