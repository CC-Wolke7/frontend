import {Component, OnInit} from '@angular/core';
import {FavService} from '../_services/fav.service';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';
import {ViewDidEnter} from "@ionic/angular";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    favorites: Offer[] = [];
    user: User;

    constructor(private favService: FavService,
                private offerService: OfferService,
                private userService: UserService) {
    }

    ionViewDidEnter() {
        this.reloadFavs().then();
    }

    async ngOnInit() {
        this.user = await this.userService.getUser();
        await this.reloadFavs();
    }

    async reloadFavs() {
        const favs = await this.favService.getFavs();
        const favObj: Offer[] = [];
        for (const fav of favs) {
            favObj.push(await this.offerService.getOffer(fav));
        }
        this.favorites = favObj;
    }
}
