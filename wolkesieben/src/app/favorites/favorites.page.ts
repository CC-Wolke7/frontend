import { Component, OnInit } from '@angular/core';
import {FavService} from '../_services/fav.service';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Offer[] = [];
  user: User;

  constructor(private favService: FavService,
              private offerService: OfferService) { }

  async ngOnInit() {
    this.user = UserService.getLocalUser();
    const favs = await this.favService.getFavs();
    for (const fav of favs) {
      this.favorites.push(await this.offerService.getOffer(fav));
    }
  }

}
