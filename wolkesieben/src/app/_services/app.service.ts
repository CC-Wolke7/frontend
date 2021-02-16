import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import {Observable} from 'rxjs';
import {User} from '../_objects/user';
import {Offer} from '../_objects/offer';
import jwt_decode from 'jwt-decode';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  static readonly LOCAL_STORAGE_KEY = 'appUser';

  static readonly APP_URL_LOCAL = 'http://localhost:8000';
  static readonly APP_URL_PROD = 'https://app.cc-wolkesieben.de';

  static readonly LIKE_URL_LOCAL = 'http://localhost:3002';
  static readonly LIKE_URL_PROD = 'https://like.cc-wolkesieben.de';

  static readonly CHAT_URL_LOCAL = 'http://localhost:3000';
  static readonly CHAT_URL_PROD = 'https://chat.cc-wolkesieben.de';

  readonly ROUTES = {
    user: '/api/token/google',
    offers: '/offers',
    subscription: '/users/:userUuid/subscription/',
    uploadImg: '/users/:userUuid/upload_profile_image/',
    getImage: '/users/:userUuid/get_profile_image/'
  };

  constructor(private httpClient: HttpClient) { }

  static getHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));
    return new HttpHeaders({
      Authorization: `Bearer ${user.jwtToken.access}`
    });
  }

  private static getUrl(route: string): string {
    return `${isDevMode() ? AppService.APP_URL_LOCAL : AppService.APP_URL_PROD}${route}`;
  }

  async getImage(user: User): Promise<string> {
    const headers: HttpHeaders = AppService.getHeaders();
    const options = {headers};
    const url = AppService.getUrl(this.ROUTES.getImage).replace(':userUuid', user.uuid);
    return this.httpClient.get<string>(url, options).toPromise();
  }

  async login(googleUser: GoogleUser): Promise<User> {
    const u = localStorage.getItem(AppService.LOCAL_STORAGE_KEY);
    if (u) {
      return Promise.resolve( JSON.parse(u));
    }
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${googleUser.getAuthResponse().id_token}`
    });
    const options = {headers};
    const url = AppService.getUrl(this.ROUTES.user);
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
    const headers: HttpHeaders = new HttpHeaders();
    const options = {headers};
    const url = AppService.getUrl(this.ROUTES.offers);
    return this.httpClient.get<Offer[]>(url, options);
  }

  async subscribe(user: User, chosenBreed: string) {
    const headers: HttpHeaders = AppService.getHeaders();
    const url = AppService.getUrl(this.ROUTES.subscription.replace(':userUuid', user.uuid));
    const params = {breed: chosenBreed};
    return await this.httpClient.request('post', url, {headers, body: params}).toPromise();
  }

  async uploadImage(user: User, base64data: string){
    const headers: HttpHeaders = AppService.getHeaders();
    const url = AppService.getUrl(this.ROUTES.uploadImg.replace(':userUuid', user.uuid));
    const params = {name: `profileImg-${user.uuid}`, image: base64data};
    return await this.httpClient.request('put', url, {headers, body: params}).toPromise();
  }

}
