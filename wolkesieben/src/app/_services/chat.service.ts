import {Injectable, isDevMode} from '@angular/core';
import {UserService} from './user.service';
import {Message} from '../_objects/message';
import {User} from '../_objects/user';
import {Chat} from '../_objects/chat';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as qs from 'qs';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    readonly LOCAL_STORAGE_USER_KEY = 'appUser';

    HTTP_URL = 'http://localhost:3000/chats';
    HTTP_URL_PROD = 'https://wolke-sieben-fs.ey.r.appspot.com/chats';

    MESSAGES_HTTP_URL = 'http://localhost:3000/chat/:chatId/messages';
    MESSAGES_HTTP_URL_PROD = 'https://wolke-sieben-fs.ey.r.appspot.com/chat/:chatId/messages';

    user: User;
    chat: Chat;

    public messages: Subject<Message>;

    constructor(private userService: UserService,
                private httpClient: HttpClient) {
    }

    getUrlHttp() {
        return isDevMode() ? this.HTTP_URL : this.HTTP_URL_PROD;
    }

    getUrlMessages() {
        return isDevMode() ? this.MESSAGES_HTTP_URL : this.MESSAGES_HTTP_URL_PROD;
    }

    getHeader(): HttpHeaders {
        const user = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_KEY));
        return new HttpHeaders({Authorization: `Bearer ${user.jwtToken.access}`});
    }

    async getMessages(chatId): Promise<Message[]> {
        const headers: HttpHeaders = this.getHeader();
        const options = {headers};
        const url = this.getUrlMessages().replace(':chatId', chatId);
        return this.httpClient.get<Message[]>(url, options).toPromise();
    }

    async getAllChats(): Promise<Chat[]> {
        const headers: HttpHeaders = this.getHeader();
        const params: HttpParams = new HttpParams();
        params.append('strictEqual', qs.stringify(false));
        params.append('participants', qs.stringify([], {arrayFormat: 'indices'}));
        const options = {headers, params};
        return this.httpClient.get<Chat[]>(this.getUrlHttp(), options).toPromise();
    }

    async getChats(ownerUuid: string): Promise<Chat[]> {
        const headers: HttpHeaders = this.getHeader();
        const params: HttpParams = new HttpParams();
        params.append('strictEqual', qs.stringify(true));
        params.append('participants', qs.stringify([ownerUuid], {arrayFormat: 'indices'}));
        const options = {headers, params};
        return this.httpClient.get<Chat[]>(this.getUrlHttp(), options).toPromise();
    }

    async pushChat(ownerUuid: string): Promise<Chat> {
        const headers: HttpHeaders = this.getHeader();
        const params = {participants: [ownerUuid]};
        return this.httpClient.post<Chat>(this.getUrlHttp(), params, {headers}).toPromise();
    }
}
