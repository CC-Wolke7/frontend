import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import {Observable} from 'rxjs';
import {User} from '../_objects/user';
import {Offer} from '../_objects/offer';
import {Token} from "../_objects/token";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly LOCAL_STORAGE_KEY = 'appUser';
  readonly LOCAL_URL = 'http://localhost:8000';
  readonly PROD_URL = 'https://app-api-xm7n7eaepa-ey.a.run.app/';
  readonly ROUTES = {
    //user: '/users/1/create_token/',
    user: '/api/token/google',
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

  async login(googleUser: GoogleUser): Promise<User> {
    const u = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (u) {
      return new Promise(JSON.parse(u));
    }
    // console.log('auth response id_token', googleUser.getAuthResponse().id_token);
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${googleUser.getAuthResponse().id_token}`
    });
    const options = {headers};
    const url = this.getUrl(this.ROUTES.user);
    console.log(googleUser, options, googleUser.getAuthResponse().id_token);
    const jwtToken = await this.httpClient.get<any>(url, options).toPromise();
    const user = new User(googleUser, 'google');
    user.jwtToken = jwtToken;
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  getOffers(): Observable<Offer[]> {
    const user: User = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
    if (!user) {
      return;
    }
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${user.jwtToken.access}`
    });
    const options = {headers};
    const url = this.getUrl(this.ROUTES.offers);
    console.log({headers, url});
    return this.httpClient.get<Offer[]>(url, options);
  }
}
