import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Observable, of} from 'rxjs';
import {delay, filter, map, retryWhen, switchMap} from 'rxjs/operators';
import {webSocket} from 'rxjs/webSocket';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    connection: WebSocketSubject<any>;
    RETRY_SECONDS = 10;
    WEBSOCKET_URL = 'ws://localhost:3000/';

    constructor(private userService: UserService) {
        this.connect();
    }

    connect(): Observable<any> {
        return of(this.WEBSOCKET_URL).pipe(
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

    send(data: any, ownerUuid?: string) {
        if (!this.connection) {return;}
        const payload = {
            token: this.userService.user.jwtToken,
            owner: ownerUuid,
            data
        };
        this.connection.next(payload);
    }
}
