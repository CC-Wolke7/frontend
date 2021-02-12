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
            const offers: any = await this.offerService.getOffers().toPromise();
            console.log(offers);
            if (offers.length === 0) {
                this.offers = await this.httpClient.get<Offer[]>('/assets/testdata/offers.json').toPromise();
            } else {
                for (const offer of offers) {
                    offer.sex = 'F'; // fixme remove fallback
                    offer.place = 'Frankfurt am Main'; // fixme remove fallback
                    if (offer.media.length === 0) { // fixme remove fallback
                        offer.media.push('assets/testdata/images/nox.jpg');
                    }
                    try {
                        const user = await this.httpClient.get<User>(offer.published_by).toPromise();
                        console.log(user);
                        offer.published_by = user;
                    } catch (e) {
                        console.warn(e);
                        offer.published_by = JSON.parse(localStorage.getItem('appUser'));  // fixme remove fallback
                    }
                }
                this.offers = offers;
            }
        } catch (e) {
            this.offers = await this.httpClient.get<Offer[]>('/assets/testdata/offers.json').toPromise();
        }

        for (const offer of this.offers) {
            this.likeService.getLike(offer).then((like: Like) => {
                offer.like = like;
            });
        }
    }

    initUser(event): void {
        this.userService.authenticate().then((googleUser: GoogleUser) => {
            console.log(googleUser);
        });
    }
}
