import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../_objects/user';

@Component({
    selector: 'app-auth-button',
    templateUrl: './auth-button.component.html',
    styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit {

    public gapiSetup = false; // marks if the gapi library has been loaded
    public authInstance: gapi.auth2.GoogleAuth;
    public error: string;
    public user: gapi.auth2.GoogleUser;

    isLoading = true;

    @Output() userLoaded: EventEmitter<gapi.auth2.GoogleUser> = new EventEmitter();

    constructor() {
    }

    async ngOnInit() {
        if (await this.checkIfUserAuthenticated()) {
            this.isLoading = false;
            this.user = this.authInstance.currentUser.get();
            if (this.user) {
                console.log('emit event');
                this.userLoaded.next(this.user);
            }
        }
        // console.log(JSON.stringify(this.user));
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
                user => this.user = user,
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
}
