import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
    selector: 'app-auth-button',
    templateUrl: './auth-button.component.html',
    styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit {

    public googleUser: GoogleUser;

    constructor(private userService: UserService) {}

    async authenticate() {
        this.googleUser = await this.userService.authenticate();
        // todo reload user
    }

    disconnect() {
        this.googleUser.disconnect();
        this.googleUser = null;
        // window.location.reload();
    }

    async ngOnInit() {
        if (await this.userService.checkIfUserAuthenticated()) {
            this.googleUser = this.userService.getGoogleUser();
        }
    }
}
