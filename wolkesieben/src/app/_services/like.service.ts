import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Like} from '../_objects/like';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private HTTP_HEADERS = {}; // FIXME;
  private ROUTES: {
    likes: 'likes/user',
    sendLike: 'likes/user/'
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * @description gets url in dependence of environment
   * @param route: string
   * @return string: url of like service
   * @private
   */
  private static getUrl(route: string): string {
    if (isDevMode()) {
      return `http://localhost:3000/${route}`;
    } else {
      return `https://likeservice.wolkesieben.de/${route}`;
    }
  }

  /**
   * @description calls like microservice to get all likes from one user
   * @param user: gapi.auth2.GoogleUser
   * @return Observable<Like[]>: Observable all likes from given user
   */
  getLikes(user: gapi.auth2.GoogleUser): Observable<Like[]> {
    const headers = this.HTTP_HEADERS;
    const params = {user: user.getId()};
    const options = {headers, params};
    return this.httpClient.get<Like[]>(LikeService.getUrl(this.ROUTES.likes), options);
  }

  /**
   * @description sends likes from one user to like microservice
   * @param likes: Like[]
   * @return Observable<boolean>: Observable if send was successful
   */
  sendLikes(likes: Like[]): Observable<boolean> {
    const headers = this.HTTP_HEADERS;
    const params = {likes};
    const options = {headers, params};
    return this.httpClient.post<boolean>(LikeService.getUrl(this.ROUTES.sendLike), options);
  }
}
