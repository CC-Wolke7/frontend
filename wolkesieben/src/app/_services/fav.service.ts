import {Injectable, isDevMode} from '@angular/core';
import {User} from '../_objects/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Offer} from '../_objects/offer';
import {AppService} from './app.service';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private httpClient: HttpClient) { }

  private static getUrl() {
    return `${isDevMode() ? AppService.APP_URL_LOCAL : AppService.APP_URL_PROD}/users/:userId/get_favorites/`;
  }

  private static postUrl() {
    return `${isDevMode() ? AppService.APP_URL_LOCAL : AppService.APP_URL_PROD}/users/:userId/favorite/`;
  }

  private static deleteUrl() {
    return `${isDevMode() ? AppService.APP_URL_LOCAL : AppService.APP_URL_PROD}/users/:userId/delete_favorite/`;
  }

  async getFavs(): Promise<any> {
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    const url = FavService.getUrl().replace(':userId', user.uuid);
    const headers = AppService.getHeaders();
    return this.httpClient.get<any>(url, {headers}).toPromise();
  }

  async saveFav(offer: Offer) {
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    const url = FavService.postUrl().replace(':userId', user.uuid);
    const headers = AppService.getHeaders();
    const payload = {offer: offer.uuid};
    return this.httpClient.post(url, payload, {headers}).toPromise();
  }

  async removeFav(offer: Offer) {
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    const url = FavService.deleteUrl().replace(':userId', user.uuid);
    const headers = AppService.getHeaders();
    const body = {offer: offer.uuid};
    return this.httpClient.request('delete', `${url}`, {headers, body}).toPromise();
  }
}
