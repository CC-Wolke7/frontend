import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../_objects/message';
import {ChatService} from '../../_services/chat.service';
import {User} from '../../_objects/user';
import {Chat} from '../../_objects/chat';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-offer-chat',
  templateUrl: './offer-chat.component.html',
  styleUrls: ['./offer-chat.component.scss'],
})
export class OfferChatComponent implements OnInit, OnDestroy {

  @Input() ownerUuid: string;
  @Input() ownerName: string;
  messages: Message[] = [];
  newMessage = '';
  user: User;
  chat: Chat;
  sellerName = '';

  constructor(private chatService: ChatService,
              private userService: UserService) { }

  async ngOnInit() {
    // todo load messages
    this.user = await this.userService.getUser();
    this.messages = [
      {chat: '', uuid: this.ownerUuid, sender: this.user.uuid, body: 'Hallo, ich interessiere mich für Nox.', date: new Date(2021, 0, 30)},
      {chat: '', uuid: this.user.uuid, sender: this.ownerUuid, body: 'Guten Tag, das ist schön. Nox ist sehr lieb und verspielt.', date: new Date(2021, 0, 31)},
      {chat: '', uuid: this.ownerUuid, sender: this.user.uuid, body: 'Wunderbar, verträgt er sich mit anderen Hunden?', date: new Date(2021, 1, 1)},
      {chat: '', uuid: this.user.uuid, sender: this.ownerUuid, body: 'Ja, er liebt andere Hunde und auch Katzen', date: new Date(2021, 1, 2)},
    ];

    this.chatService.connect().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    });
    await this.getChat();
  }

  async getChat() {
    console.warn(this.ownerUuid);
    const chats = await this.chatService.getChats(this.ownerUuid);
    if (chats.length === 0) {
      this.chat = await this.chatService.pushChat(this.ownerUuid);
    } else {
      this.chat = chats[0];
    }
  }

  ngOnDestroy() {
    this.chatService.closeConnection();
  }

  sendMessage() {
    this.chatService.send(this.newMessage, this.ownerUuid, this.chat);
    this.messages.push({
      sender: this.ownerUuid,
      body: this.newMessage,
      date: new Date(),
      uuid: this.user.uuid,
      chat: ''
    });
    this.newMessage = '';
  }

}
