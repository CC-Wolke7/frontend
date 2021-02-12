import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../_objects/message';
import {User} from "../../_objects/user";
import {AppService} from "../../_services/app.service";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  user: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));
  }

  ngOnInit() {
    console.log({userUuid: this.user.uuid, messageSender: this.message.sender, message: this.message});
  }

}
