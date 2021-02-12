import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../_objects/user';
import {AppService} from '../../_services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));
  }

}
