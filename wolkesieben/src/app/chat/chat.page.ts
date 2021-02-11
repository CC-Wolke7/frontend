import { Component, OnInit } from '@angular/core';
import {Chat} from '../_objects/chat';
import {ChatService} from '../_services/chat.service';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';
import {Message} from '../_objects/message';
import {v4 as uuidv4} from 'uuid';
import {WebSocketEventName, WebsocketService} from '../_services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chats: Chat[];
  activeChat: Chat;
  messages: Message[];
  newMessage: string;

  constructor(private chatService: ChatService,
              private websocketService: WebsocketService) {

  }

  ngOnInit() {
    this.getChats().then();
  }

  async getMessages(chat: Chat) {
    this.activeChat = chat;
    this.messages = await this.chatService.getMessages(chat.uuid);
    this.initChat();
  }

  initChat() {
    this.websocketService.chat = this.activeChat;
    this.websocketService.init();

    this.websocketService.ws.subscribe(msg => {
      if (msg.event === WebSocketEventName.ReceivedMessage) {
        this.messages.push(msg.data);
      } else {
        console.error(msg);
      }
    });
  }

  async getChats() {
    this.chats = await this.chatService.getAllChats();
  }

  send() {
    const message = {
      chat: this.activeChat.uuid,
      message: this.newMessage,
    };
    this.websocketService.sendMessage(message);
    this.newMessage = '';
  }

  async createChat() {
    const user = JSON.parse(localStorage.getItem('appUser')) as User;
    if (!user.uuid) {
      user.uuid = uuidv4();
      localStorage.setItem('appUser', JSON.stringify(user));
    }
    console.log(user.uuid);
    const chat: Chat = await this.chatService.pushChat(user.uuid);
    this.chats.push(chat);
    await this.getMessages(chat);
  }
}
