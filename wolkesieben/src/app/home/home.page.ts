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
            // this.offers = await this.httpClient.get<Offer[]>('/assets/testdata/offers.json').toPromise();
            this.offers = await this.offerService.getOffers().toPromise();
        } catch (e) {
            // fixme remove fallback
            this.offers = await this.httpClient.get<Offer[]>('/assets/testdata/offers.json').toPromise();
        }
    }

    initUser(event): void {
        this.userService.authenticate().then((googleUser: GoogleUser) => {
            console.log(googleUser);
        });
    }
}
