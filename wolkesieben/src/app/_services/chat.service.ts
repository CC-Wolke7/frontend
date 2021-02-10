import {Injectable, isDevMode} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Observable, of} from 'rxjs';
import {delay, filter, map, retryWhen, switchMap} from 'rxjs/operators';
import {webSocket} from 'rxjs/webSocket';
import {UserService} from './user.service';
import {Message} from '../_objects/message';
import {User} from '../_objects/user';
import {Chat} from '../_objects/chat';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as qs from 'qs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    connection: WebSocketSubject<any>;
    RETRY_SECONDS = 10;

    WEBSOCKET_URL = 'ws://localhost:3000/';
    WEBSOCKET_URL_PROD = 'ws://wolke-sieben-fs.ey.r.appspot.com/';

    HTTP_URL = 'http://localhost:3000/chats';
    HTTP_URL_PROD = 'https://wolke-sieben-fs.ey.r.appspot.com/chats';

    MESSAGES_HTTP_URL = 'http://localhost:3000/chat/:chatId/messages';
    MESSAGES_HTTP_URL_PROD = 'https://wolke-sieben-fs.ey.r.appspot.com/chat/:chatId/messages';

    user: User;
    chat: Chat;

    constructor(private userService: UserService,
                private httpClient: HttpClient) {
        this.connect();
    }

    getUrlWebsocket() {
        return isDevMode() ? this.WEBSOCKET_URL : this.WEBSOCKET_URL_PROD;
    }

    getUrlHttp() {
        return isDevMode() ? this.HTTP_URL : this.HTTP_URL_PROD;
    }

    getUrlMessages() {
        return isDevMode() ? this.MESSAGES_HTTP_URL : this.MESSAGES_HTTP_URL_PROD;
    }

    async putMessage(chatId, message: string): Promise<Message> {
        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.user.jwtToken.access}`
        });
        const params: HttpParams = new HttpParams();
        params.append('requestBody', qs.stringify(message));
        const url = this.getUrlMessages().replace(':chatId', chatId);
        return this.httpClient.post<Message>(url, {message}, {headers}).toPromise();
    }

    async getMessages(chatId): Promise<Message[]> {
        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.user.jwtToken.access}`
        });
        const options = {headers};
        const url = this.getUrlMessages().replace(':chatId', chatId);
        return this.httpClient.get<Message[]>(url, options).toPromise();
    }

    async getAllChats(): Promise<Chat[]> {
        await this.initUser();

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.user.jwtToken.access}`
        });
        const params: HttpParams = new HttpParams();
        params.append('strictEqual', qs.stringify(false));
        params.append('participants', qs.stringify([], {arrayFormat: 'indices'}));
        const options = {headers, params};
        return this.httpClient.get<Chat[]>(this.getUrlHttp(), options).toPromise();
    }

    async getChats(ownerUuid: string): Promise<Chat[]> {
        await this.authenticate();

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.user.jwtToken.access}`
        });
        const params: HttpParams = new HttpParams();
        params.append('strictEqual', qs.stringify(true));
        params.append('participants', qs.stringify([ownerUuid], {arrayFormat: 'indices'}));
        const options = {headers, params};
        return this.httpClient.get<Chat[]>(this.getUrlHttp(), options).toPromise();
    }

    async pushChat(ownerUuid: string): Promise<Chat> {
        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.user.jwtToken.access}`
        });
        const params = {participants: [ownerUuid]};
        return this.httpClient.post<Chat>(this.getUrlHttp(), params, {headers}).toPromise();
    }

    connect(): Observable<any> {
        return of(this.getUrlWebsocket()).pipe(
            filter(apiUrl => !!apiUrl),
            switchMap(wsUrl => {
                if (!this.connection) {
                    this.connection = webSocket(wsUrl);
                    return this.connection;
                }
            }),
            retryWhen(errors => errors.pipe(delay(this.RETRY_SECONDS)))
        );
    }

    closeConnection() {
        if (this.connection) {
            this.connection.complete();
            this.connection = null;
        }
    }

    send(data: any, ownerUuid: string, chat: Chat) {
        if (!this.connection) {return;}
        console.log({chat: this.chat});
        const payload: Message = {
            body: data,
            sender: ownerUuid,
            chat: chat.uuid,
            date: new Date(),
            uuid: this.user.uuid
        };
        this.connection.next(payload);
    }

    async initUser() {
        this.user = await this.userService.getUser();
        console.log(this.user);
    }

    async authenticate() {
        if (!this.connection) {return;}
        await this.initUser();
        const payload = {
            token: this.user.jwtToken.access
        };
        this.connection.next(payload);
    }
}
