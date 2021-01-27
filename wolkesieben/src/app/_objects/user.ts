import GoogleUser = gapi.auth2.GoogleUser;

export class User {
    userType = 'USER';
    uuid: string;
    userId: string;
    type: string;
    jwtToken: string;
    firstname: string;

    constructor(user: GoogleUser, type = 'google') {
        this.userId = user.getId();
        this.uuid = ''; // generate uuid
        this.type = type;
    }
}
