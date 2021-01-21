import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(private appService: AppService) {
    }

    getRandomOffers(count: number = 24, detail: boolean = false) {
        let path = '/offers';
        if (isDevMode()) { // TODO remove for prod
            path = '/assets/testdata/offers.json';
        }
        return this.appService.httpGet(path, {count, detail});
    }
}
