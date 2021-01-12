import {Injectable, isDevMode} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(private apiService: ApiService) {
    }

    getRandomOffers(count: number = 24, detail: boolean = false) {
        let path = '/offers';
        if (isDevMode()) { // TODO remove for prod
            path = '/assets/testdata/offers.json';
        }
        return this.apiService.httpGet(path, {count, detail});
    }
}
