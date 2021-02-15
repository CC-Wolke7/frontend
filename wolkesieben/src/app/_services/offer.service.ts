import {Injectable, isDevMode} from '@angular/core';
import {AppService} from './app.service';
import {Offer} from '../_objects/offer';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
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
        const url = OfferService.getUrl('/offers/:offerUuid/get_images').replace(':offerUuid', uuid);
        const headers = AppService.getHeaders();
        return this.httpClient.get<any[]>(url, {headers}).toPromise();
    }

    async uploadImage(uuid: string, data: any) {
        const url = OfferService.getUrl('/offers/:offerUuid/upload_image').replace(':offerUuid', uuid);
        const headers = AppService.getHeaders();
        const params: HttpParams = new HttpParams();
        params.append('name', qs.stringify(data.name));
        params.append('image', qs.stringify(data.image));
        return this.httpClient.post(url, params, {headers}).toPromise();
    }

    async getOffer(uuid: string): Promise<Offer> {
        const url = OfferService.getUrl(`/offers/${uuid}`);
        const headers = AppService.getHeaders();
        return this.httpClient.get<Offer>(url, {headers}).toPromise();
    }

    async uploadOffer(offer): Promise<Offer> {
        const url = OfferService.getUrl('/offers/');
        const headers = AppService.getHeaders();
        return this.httpClient.post<Offer>(url, offer, {headers}).toPromise();
    }

    async getSpecies(): Promise<any[]> {
        const url = OfferService.getUrl('/species/?species=all');
        const headers = AppService.getHeaders();
        return this.httpClient.get<any[]>(url, {headers}).toPromise();
    }

    async getBreeds(species): Promise<any[]> {
        const url = OfferService.getUrl(`/species/?species=${species}`);
        const headers = AppService.getHeaders();
        return this.httpClient.get<any[]>(url, {headers}).toPromise();
    }
}
