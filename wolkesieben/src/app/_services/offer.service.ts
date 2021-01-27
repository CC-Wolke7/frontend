import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';
import {Offer} from '../_objects/offer';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    readonly URL_LOCAL = 'http://localhost:8100';

    constructor(private appService: AppService) {}

    getRandomOffers(count: number = 24, detail: boolean = false) {
        let path = '/offers';
        if (isDevMode()) { // TODO remove for prod
            path = '/assets/testdata/offers.json';
        }
        return this.appService.getOffers();
    }

    getOffers(): Observable<Offer[]> {
        return this.appService.getOffers();
    }
}
