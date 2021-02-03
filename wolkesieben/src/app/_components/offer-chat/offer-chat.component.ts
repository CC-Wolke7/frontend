import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../_objects/message';
import {ChatService} from '../../_services/chat.service';

@Component({
  selector: 'app-offer-chat',
  templateUrl: './offer-chat.component.html',
  styleUrls: ['./offer-chat.component.scss'],
})
export class OfferChatComponent implements OnInit, OnDestroy {

  @Input() ownerUuid: string;
  @Input() userUuid: string;
  messages: Message[] = [];
  newMessage = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // todo load messages
    this.messages = [
      {sender: true, body: 'Hallo, ich interessiere mich für Nox.', timestamp: new Date(2021, 0, 30)},
      {sender: false, body: 'Guten Tag, das ist schön. Nox ist sehr lieb und verspielt.', timestamp: new Date(2021, 0, 31)},
      {sender: true, body: 'Wunderbar, verträgt er sich mit anderen Hunden?', timestamp: new Date(2021, 1, 1)},
      {sender: false, body: 'Ja, er liebt andere Hunde und auch Katzen', timestamp: new Date(2021, 1, 2)},
    ];

    this.chatService.connect().subscribe(message => {
      console.log('chat');
      this.messages.push(message)
    });
  }

  ngOnDestroy() {
    this.chatService.closeConnection();
  }

  sendMessage() {
    this.chatService.send(this.newMessage);
    this.messages.push({
      sender: true,
      body: this.newMessage,
      timestamp: new Date()
    });
    this.newMessage = '';
  }

}
