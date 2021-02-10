import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';
import {Offer} from '../_objects/offer';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(private appService: AppService) {}

    getOffers(): Observable<Offer[]> {
        return this.appService.getOffers();
    }
}
