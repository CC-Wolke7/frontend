import GoogleUser = gapi.auth2.GoogleUser;
import {Token} from './token';
import {Offer} from './offer';

export class User {
    is_staff = false;
    uuid: string;
    externalId: string;
    signUpMethod: string;
    jwtToken: Token;
    name: string;
    description: string;
    profileImageName: string;
    offers: Offer[];

    constructor(user: GoogleUser, type = 'google') {
        this.externalId = user.getId();
        this.uuid = ''; // generate uuid
        this.signUpMethod = type;
    }
}
