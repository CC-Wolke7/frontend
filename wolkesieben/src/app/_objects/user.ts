import GoogleUser = gapi.auth2.GoogleUser;
import {Token} from "./token";

export class User {
    userType = 'USER';
    uuid: string;
    userId: string;
    type: string;
    jwtToken: Token;
    firstname: string;
    lastname: string;

    constructor(user: GoogleUser, type = 'google') {
        this.userId = user.getId();
        this.uuid = ''; // generate uuid
        this.type = type;
    }
}
