import {Injectable, isDevMode} from '@angular/core';
import {UserService} from './user.service';
import {Message} from '../_objects/message';
import {Chat} from '../_objects/chat';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as qs from 'qs';
import {AppService} from './app.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private userService: UserService,
                private httpClient: HttpClient) {
    }

    private static getUrlHttp() {
        return `${isDevMode() ? AppService.CHAT_URL_LOCAL : AppService.CHAT_URL_PROD}/chats`;
    }

    private static getUrlMessages() {
        return `${isDevMode() ? AppService.CHAT_URL_LOCAL : AppService.CHAT_URL_PROD}/chat/:chatId/messages`;
    }

    async getMessages(chatId): Promise<Message[]> {
        const headers: HttpHeaders = AppService.getHeaders();
        const options = {headers};
        const url = ChatService.getUrlMessages().replace(':chatId', chatId);
        return this.httpClient.get<Message[]>(url, options).toPromise();
    }

    async getAllChats(): Promise<Chat[]> {
        const headers: HttpHeaders = AppService.getHeaders();
        const params: HttpParams = new HttpParams();
        params.append('strictEqual', qs.stringify(false));
        params.append('participants', qs.stringify([], {arrayFormat: 'indices'}));
        const options = {headers, params};
        return this.httpClient.get<Chat[]>(ChatService.getUrlHttp(), options).toPromise();
    }

    async getChats(ownerUuid: string): Promise<Chat[]> {
        const headers: HttpHeaders = AppService.getHeaders();
        const params: HttpParams = new HttpParams();
        params.append('strictEqual', qs.stringify(true));
        params.append('participants', qs.stringify([ownerUuid], {arrayFormat: 'indices'}));
        const options = {headers, params};
        return this.httpClient.get<Chat[]>(ChatService.getUrlHttp(), options).toPromise();
    }

    async pushChat(ownerUuid: string): Promise<Chat> {
        const headers: HttpHeaders = AppService.getHeaders();
        const params = {participants: [ownerUuid]};
        return this.httpClient.post<Chat>(ChatService.getUrlHttp(), params, {headers}).toPromise();
    }
}
