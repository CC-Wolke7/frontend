import {Component, OnInit} from '@angular/core';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';
import {Like} from '../_objects/like';
import {LikeService} from '../_services/like.service';
import {User} from '../_objects/user';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../_services/user.service';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    offers: Offer[] = [];
    user: User;
    likes: Like[];

    constructor(private offerService: OfferService,
                private likeService: LikeService,
                private httpClient: HttpClient,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getUser().then((user: User) => {
            this.user = user;
            this.loadOffers().then();
        });
    }

    async loadOffers() {
        try {
            this.offers = await this.offerService.getOffers().toPromise();
            if (this.offers.length === 0) {
                this.offers = await this.httpClient.get<Offer[]>('http://localhost:8000/assets/testdata/offers.json').toPromise();
            }
        } catch (e) {
            this.offers = await this.httpClient.get<Offer[]>('http://localhost:8000/assets/testdata/offers.json').toPromise();
        }

        for (const offer of this.offers) {
            offer.like = await this.likeService.getLike(this.user, offer);
        }
    }

    initUser(event): void {
        this.userService.authenticate().then((googleUser: GoogleUser) => {
            console.log(googleUser);
        });
    }

    logout(googleUser: GoogleUser) {
        googleUser.disconnect();
        this.user = null;
    }
}
