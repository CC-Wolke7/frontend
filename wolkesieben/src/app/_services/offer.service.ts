import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';
import {Offer} from '../_objects/offer';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as qs from 'qs';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(private appService: AppService,
                private httpClient: HttpClient) {
    }

    public static getUrl(route: string) {
        return `${isDevMode() ? AppService.APP_URL_LOCAL : AppService.APP_URL_PROD}${route}`;
    }

    getOffers(): Observable<Offer[]> {
        return this.appService.getOffers();
    }

    async getImages(uuid: string): Promise<any[]> {
        const url = OfferService.getUrl('/offers/:offerUuid/get_images/').replace(':offerUuid', uuid);
        const headers = new HttpHeaders();
        return this.httpClient.get<any[]>(url, {headers}).toPromise();
    }

    async uploadImage(uuid: string, data: any) {
        const url = OfferService.getUrl('/offers/:offerUuid/upload_image/').replace(':offerUuid', uuid);
        const headers = AppService.getHeaders();
        const randString = Math.random().toString(36).substr(2, 5);
        const params = {name: `${randString}-${uuid}`, image: data};
        return this.httpClient.request('post', url, {headers, body: params}).toPromise();
    }

    async getOffer(uuid: string): Promise<Offer> {
        const url = OfferService.getUrl(`/offers/${uuid}/`);
        const headers = AppService.getHeaders();
        return this.httpClient.get<Offer>(url, {headers}).toPromise();
    }

    async uploadOffer(offer): Promise<Offer> {
        const url = OfferService.getUrl('/offers/');
        const headers = AppService.getHeaders();
        return this.httpClient.request<Offer>('post', url, {headers, body: offer}).toPromise();
    }

    async getSpecies(): Promise<any[]> {
        const url = OfferService.getUrl('/species/');
        const headers = AppService.getHeaders();
        return this.httpClient.get<any[]>(url, {headers}).toPromise();
    }

    async getBreeds(species): Promise<any[]> {
        const url = OfferService.getUrl(`/species/?species=${species}`);
        const headers = AppService.getHeaders();
        return this.httpClient.get<any[]>(url, {headers}).toPromise();
    }
}
