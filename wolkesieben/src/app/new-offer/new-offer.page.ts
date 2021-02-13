import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from "../_objects/user";
import {Offer} from "../_objects/offer";

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  offer: Offer;
  allSpecies: any[];
  allBreeds: any[];

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.offer = new Offer();
    await this.userService.getUser();
  }

}
