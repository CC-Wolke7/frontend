import {Component, Input, OnInit} from '@angular/core';
import {User} from '../_objects/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {

  }

}
