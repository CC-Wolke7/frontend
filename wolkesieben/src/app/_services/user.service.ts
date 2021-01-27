import { Injectable } from '@angular/core';
import {AppService} from './app.service';
import GoogleUser = gapi.auth2.GoogleUser;
import {User} from '../_objects/user';
import {Observable} from 'rxjs';

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

  constructor(private appService: AppService) {

  }

  async getUser() {
    if (await this.checkIfUserAuthenticated()) {
      this.isLoading = false;
      this.googleUser = this.authInstance.currentUser.get();

      const users: User[] = await this.checkUser(this.authInstance.currentUser.get()).toPromise();
      if (users.length === 0) {
        const user = new User(this.googleUser);
        user.jwtToken = 'NTZiYWU4YjE1ZmQyYzdlMGViZDI1Y2EzODMzZTUxZjQK';
        return user;
      } else {
        return users[0];
      }
    }
  }



  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
          .init({ client_id: '882517722597-3p6j1koj84oa27kv4bc9t58egianqf3e.apps.googleusercontent.com' })
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

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
          user => this.googleUser = user,
          error => this.error = error);
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

  checkUser(user: GoogleUser): Observable<User[]> {
    return this.appService.login(user);
  }
}
