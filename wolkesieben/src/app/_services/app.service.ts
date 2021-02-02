import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import {Observable} from 'rxjs';
import {User} from '../_objects/user';
import {Offer} from '../_objects/offer';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly LOCAL_URL = 'http://localhost:8100';
  readonly PROD_URL = 'https://app-ms.wolkesieben.appspot.com';
  readonly ROUTES = {
    user: '/user',
    offers: '/offers'
  };

  constructor(private httpClient: HttpClient) { }

  private static getHeaders(user: User): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${user.jwtToken}`
    });
  }
  private getUrl(route: string): string {
    if (isDevMode()) {
      return `${this.LOCAL_URL}${route}`;
    } else {
      return `${this.PROD_URL}${route}`;
    }
  }

  login(googleUser: GoogleUser): Observable<User[]> { // TODO add : Promise<User>
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${googleUser.getAuthResponse().id_token}`
    });
    const options = {headers};
    const url = this.getUrl(this.ROUTES.user);
    return this.httpClient.get<User[]>(url, options);

  }

  getOffers(): Observable<Offer[]> {
    const options = {};
    const url = this.getUrl(this.ROUTES.offers);
    return this.httpClient.get<Offer[]>(url, options);
  }
}
