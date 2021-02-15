import {Component, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../_objects/chat';
import {ChatService} from '../_services/chat.service';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';
import {Message} from '../_objects/message';
import {v4 as uuidv4} from 'uuid';
import {WebSocketEventName, WebsocketService} from '../_services/websocket.service';
import {AppService} from "../_services/app.service";

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
  user: User;

  @ViewChild('chatContent') chatContent;

  constructor(private chatService: ChatService,
              private websocketService: WebsocketService,
              private userService: UserService) {

  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    await this.getChats();
  }

  async getMessages(chat: Chat) {
    this.activeChat = chat;
    this.messages = await this.chatService.getMessages(chat.uuid);
    this.initChat();
    this.scrollViewToButton();
  }

  initChat() {
    this.websocketService.chat = this.activeChat;
    this.websocketService.init();

    this.websocketService.ws.subscribe(msg => {
      if (msg.event === WebSocketEventName.ReceivedMessage) {
        this.messages.push(msg.data);
        this.scrollViewToButton();
      } else {
        console.error(msg);
      }
    });
  }

  async getChats() {
    this.chats = await this.chatService.getAllChats();
    await this.chats.forEach(chat => {
      for (const p of chat.participants) {
        if (p === this.user.uuid) {
          continue;
        }
        this.userService.getByUrl(p).then(user => {
          chat.chatPartner = user.name;
        });
      }
    });
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
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    if (!user.uuid) {
      user.uuid = uuidv4();
      localStorage.setItem(AppService.LOCAL_STORAGE_KEY, JSON.stringify(user));
    }
    console.log(user.uuid);
    const chat: Chat = await this.chatService.pushChat(user.uuid);
    this.chats.push(chat);
    await this.getMessages(chat);
  }

  scrollViewToButton() {
    setTimeout(() => {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    }, 500);
  }
}
