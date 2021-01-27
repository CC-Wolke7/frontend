import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../_services/user.service';
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
    public googleUser: gapi.auth2.GoogleUser;
    public user: User;
    public uuid: string;

    isLoading = true;

    @Output() userLoaded: EventEmitter<User> = new EventEmitter();

    constructor(private userService: UserService, private httpClient: HttpClient) {
    }

    async ngOnInit() {

    }
}
