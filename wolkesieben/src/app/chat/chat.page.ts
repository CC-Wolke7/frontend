import { Component, OnInit } from '@angular/core';
import {Chat} from '../_objects/chat';
import {ChatService} from '../_services/chat.service';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';
import {Message} from '../_objects/message';

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

  constructor(private chatService: ChatService,) { }

  ngOnInit() {
    this.getChats().then();
  }

  async getMessages(chat: Chat) {
    this.activeChat = chat;
    this.messages = await this.chatService.getMessages(chat.uuid);
  }

  async getChats() {
    this.chats = await this.chatService.getAllChats();
  }

  initSocket() {

  }

  async sendMessage() {
    this.messages.push(await this.chatService.putMessage(this.activeChat.uuid, this.newMessage));
    this.newMessage = '';
  }
}
