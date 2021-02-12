import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import {Observable} from 'rxjs';
import {User} from '../_objects/user';
import {Offer} from '../_objects/offer';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  static readonly LOCAL_STORAGE_KEY = 'appUser';
  static readonly LOCAL_URL = 'http://localhost:8000';
  static readonly PROD_URL = 'https://app-api-xm7n7eaepa-ey.a.run.app';

  readonly ROUTES = {
    user: '/api/token/google',
    offers: '/offers'
  };

  constructor(private httpClient: HttpClient) { }

  static getHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));
    return new HttpHeaders({
      Authorization: `Bearer ${user.jwtToken.access}`
    });
  }

  private getUrl(route: string): string {
    if (isDevMode()) {
      return `${AppService.LOCAL_URL}${route}`;
    } else {
      return `${AppService.PROD_URL}${route}`;
    }
  }

  async login(googleUser: GoogleUser): Promise<User> {
    const u = localStorage.getItem(AppService.LOCAL_STORAGE_KEY);
    if (u) {
      return new Promise(JSON.parse(u));
    }
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${googleUser.getAuthResponse().id_token}`
    });
    const options = {headers};
    const url = this.getUrl(this.ROUTES.user);
    const jwtToken = await this.httpClient.get<any>(url, options).toPromise();
    const user = new User(googleUser, 'google');
    user.jwtToken = jwtToken;
    const tokenDecoded: any = jwt_decode(user.jwtToken.access);
    user.uuid = tokenDecoded.sub;
    user.name = tokenDecoded.name;
    localStorage.setItem(AppService.LOCAL_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  getOffers(): Observable<Offer[]> {
    const headers: HttpHeaders = AppService.getHeaders();
    const options = {headers};
    const url = this.getUrl(this.ROUTES.offers);
    return this.httpClient.get<Offer[]>(url, options);
  }
}
