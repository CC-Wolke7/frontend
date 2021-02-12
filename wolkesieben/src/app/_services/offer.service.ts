import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';
import {Offer} from '../_objects/offer';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../_objects/user";

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(private appService: AppService,
                private httpClient: HttpClient) {
    }

    private getHeaders() {
        const user = JSON.parse(localStorage.getItem('appUser')) as User;
        return new HttpHeaders({Authorization: `Bearer ${user.jwtToken.access}`});
    }

    private getUrl() {
        return isDevMode() ? 'http://localhost:8000' : '';
    }

    getOffers(): Observable<Offer[]> {
        return this.appService.getOffers();
    }

    async getOffer(uuid: string): Promise<Offer> {
        const url = `${this.getUrl()}/offers/${1}`;
        console.log(url);
        const headers = this.getHeaders();
        return this.httpClient.get<Offer>(url, {headers}).toPromise();
    }
}
