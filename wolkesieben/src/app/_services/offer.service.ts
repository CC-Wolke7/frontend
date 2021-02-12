import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';
import {Offer} from '../_objects/offer';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_objects/user';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(private appService: AppService,
                private httpClient: HttpClient) {
    }

    private static getUrl() {
        return isDevMode() ? AppService.LOCAL_URL : AppService.PROD_URL;
    }

    getOffers(): Observable<Offer[]> {
        return this.appService.getOffers();
    }

    async getOffer(uuid: string): Promise<Offer> {
        const url = `${OfferService.getUrl()}/offers/${uuid}`;
        const headers = AppService.getHeaders();
        return this.httpClient.get<Offer>(url, {headers}).toPromise();
    }
}
