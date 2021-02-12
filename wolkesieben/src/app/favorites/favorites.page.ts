import { Component, OnInit } from '@angular/core';
import {FavService} from "../_services/fav.service";
import {Offer} from "../_objects/offer";
import {OfferService} from "../_services/offer.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Offer[] = [];

  constructor(private favService: FavService,
              private offerService: OfferService) { }

  async ngOnInit() {
    console.log('getFavs');
    const db_user = await this.favService.getFavs();
    const favs = db_user.favorites;
    console.log(favs);
    for (const fav of favs) {
      this.favorites.push(await this.offerService.getOffer(fav));
    }
  }

}
