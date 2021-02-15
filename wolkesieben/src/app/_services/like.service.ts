import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Like} from '../_objects/like';
import {Offer} from '../_objects/offer';
import {User} from '../_objects/user';
import {Observable} from 'rxjs';
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  readonly URL_LOCAL = 'http://localhost:3002';
  readonly URL_PROD = 'https://wolke-sieben-fs.ey.r.appspot.com/';
  readonly ROUTES = {
    likes: '/offer/:offerId/likes'
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * @description gets full url in dependence of environment for given route
   * @param route: string
   * @return string: url of like service
   * @private
   * @static
   */
  private static getUrl(route: string): string {
    return `${isDevMode() ? AppService.LIKE_URL_LOCAL : AppService.LIKE_URL_PROD}${route}`;
  }

  /**
   * @description calls like microservice to get the likes for given offer
   * @param offer: Offer
   * @return Promise<Like>: Promise of like object
   * @async
   */
  async getLike(offer: Offer): Promise<Like> {
    const headers: HttpHeaders = AppService.getHeaders()
    const options = {headers};
    const route = this.ROUTES.likes.replace(':offerId', `${offer.uuid}`);
    const url = LikeService.getUrl(route);

    return await this.httpClient.get<Like>(url, options).toPromise();
  }

  /**
   * @description sends likes from one user to like microservice
   * @param offer: Offer
   * @return Observable<void>: no return
   */
  toggleLike(offer: Offer): Observable<void> {
    const headers: HttpHeaders = AppService.getHeaders()
    const options = {headers};

    const route = this.ROUTES.likes.replace(':offerId', `${offer.uuid}`);
    const url = LikeService.getUrl(route);

    return this.httpClient.put<void>(url, {}, options);
  }
}
