import {Component, OnInit} from '@angular/core';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';
import {Like} from '../_objects/like';
import {LikeService} from '../_services/like.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    offers: Offer[] = [];
    user: gapi.auth2.GoogleUser;
    likes: Like[];

    constructor(private offerService: OfferService,
                private likeService: LikeService) {
    }

    ngOnInit(): void {
        this.loadOffers();
    }

    loadOffers(): void {
        this.offerService.getRandomOffers().subscribe((offers: Offer[]) => {
            this.offers = offers.map(o => new Offer(o));
        });
    }

    loadLikes(): void {
        this.likeService.getLikes(this.user).subscribe((likes: Like[]) => {
            this.likes = likes;
        });
    }

    initUser(user: gapi.auth2.GoogleUser): void {
        this.user = user;
        this.loadLikes();
    }

}
