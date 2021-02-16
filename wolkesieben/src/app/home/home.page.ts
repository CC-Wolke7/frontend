import {Component, OnInit} from '@angular/core';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';
import {Like} from '../_objects/like';
import {LikeService} from '../_services/like.service';
import {User} from '../_objects/user';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../_services/user.service';
import GoogleUser = gapi.auth2.GoogleUser;
import {ViewWillEnter} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {

    offers: Offer[] = [];
    user: User;
    likes: Like[];

    constructor(private offerService: OfferService,
                private likeService: LikeService,
                private httpClient: HttpClient,
                private userService: UserService) {
    }

    async ngOnInit() {
        this.user = await this.userService.getUser();
        await this.loadOffers();
    }

    async ionViewWillEnter() {
        await this.loadOffers();
    }

    async loadOffers() {
        try {
            this.offers = await this.offerService.getOffers().toPromise();
        } catch (e) {
            this.offers = [];
        }
    }

    initUser(event): void {
        this.userService.authenticate().then((googleUser: GoogleUser) => {
            console.log(googleUser);
        });
    }
}
