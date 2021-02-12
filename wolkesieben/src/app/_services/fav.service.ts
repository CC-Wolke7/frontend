import {Injectable, isDevMode} from '@angular/core';
import {User} from '../_objects/user';
import {HttpClient} from '@angular/common/http';
import {Offer} from '../_objects/offer';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private httpClient: HttpClient) { }

  private static getUrl() {
    return `${isDevMode() ? AppService.LOCAL_URL : AppService.PROD_URL}/users/:userId/`;
  }

  private static postUrl() {
    return `${isDevMode() ? AppService.LOCAL_URL : AppService.PROD_URL}/favorites/`;
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
    const payload = {user: user.uuid, offers: offer.uuid};
    return this.httpClient.post(url, payload, {headers}).toPromise();
  }
}
