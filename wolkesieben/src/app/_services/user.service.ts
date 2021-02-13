import {Injectable} from '@angular/core';
import {AppService} from './app.service';
import {User} from '../_objects/user';
import GoogleUser = gapi.auth2.GoogleUser;
import {Token} from '../_objects/token';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public gapiSetup = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public googleUser: gapi.auth2.GoogleUser;
  public user: User;
  public uuid: string;

  isLoading = true;

  constructor(private appService: AppService,
              private httpClient: HttpClient) {}

  public static getLocalUser() {
    return JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));
  }

  async getByUrl(url: string) {
    return await this.httpClient.get<any>(url).toPromise();
  }

  async getUser(): Promise<User> {
    if (await this.checkIfUserAuthenticated()) {
      this.isLoading = false;
      this.googleUser = this.authInstance.currentUser.get();

      try {
        return await this.checkUser(this.googleUser);
      } catch (e) {
        const user: User = new User(this.googleUser);
        user.jwtToken = new Token(this.googleUser.getAuthResponse().id_token);
        return user;
      }
    } else {
      return null;
    }
  }

  getGoogleUser() {
    return this.googleUser;
  }

  async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return pload.then(async () => {
      await gapi.auth2
          .init({ client_id: '481332583913-cieg25daahj0ujclj002o0ei5der0rsi.apps.googleusercontent.com' })
          .then(auth => {
            this.gapiSetup = true;
            this.authInstance = auth;
          });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser>  {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      await this.authInstance.signIn().then(
          async user => {
            this.googleUser = user;
            await this.checkUser(this.googleUser);
            window.location.reload();
          },
          error => this.error = error);
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return this.authInstance.isSignedIn.get();
  }

  async checkUser(user: GoogleUser): Promise<User> {
    return await this.appService.login(user);
  }
}
