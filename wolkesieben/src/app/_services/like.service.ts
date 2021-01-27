import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Like} from '../_objects/like';
import {Offer} from '../_objects/offer';
import {User} from '../_objects/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  readonly URL_LOCAL = 'http://localhost:3002';
  readonly URL_PROD = 'https://like-ms.wolkesieben.appspot.com';
  readonly ROUTES = {
    likes: '/offer/:offerId/likes'
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * @description get http header with authorization bearer for like microservice
   * @param user: User
   * @return HttpHeaders: http header
   * @private
   * @static
   */
  private static getHeader(user: User): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${user.jwtToken}`
    });
  }

  /**
   * @description gets full url in dependence of environment for given route
   * @param route: string
   * @return string: url of like service
   * @private
   * @static
   */
  private getUrl(route: string): string {
    if (isDevMode()) {
      return `${this.URL_LOCAL}${route}`;
    } else {
      return `${this.URL_PROD}${route}`;
    }
  }

  /**
   * @description calls like microservice to get the likes for given offer
   * @param user: User
   * @param offer: Offer
   * @return Promise<Like>: Promise of like object
   * @async
   */
  async getLike(user: User, offer: Offer): Promise<Like> {
    const headers: HttpHeaders = LikeService.getHeader(user);
    const options = {headers};

    const route = this.ROUTES.likes.replace(':offerId', `${offer.uuid}`);
    const url = this.getUrl(route);

    const like: Like = await this.httpClient.get<Like>(url, options).toPromise();
    if (like.total === 0) {
      // like.user = 0;
    }
    return like;
  }

  /**
   * @description sends likes from one user to like microservice
   * @param user: User
   * @param offer: Offer
   * @return Observable<void>: no return
   */
  toggleLike(user: User, offer: Offer): Observable<void> {
    const headers: HttpHeaders = LikeService.getHeader(user);
    const options = {headers};

    const route = this.ROUTES.likes.replace(':offerId', `${offer.uuid}`);
    const url = this.getUrl(route);

    return this.httpClient.put<void>(url, {}, options);
  }
}
