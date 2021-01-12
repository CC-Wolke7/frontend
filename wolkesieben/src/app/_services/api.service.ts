import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly URL = '';
  readonly HTTP_HEADERS = {}; // FIXME
  readonly HTTP_HEADERS_WITH_AUTH = {}; // FIXME

  constructor(private httpClient: HttpClient) { }

  httpGet(path: string, params = {}) {
    const headers = this.HTTP_HEADERS;
    const options = {headers, params};
    return this.httpClient.get(this.URL + path, options);
  }

  httpGetWithAuth(path: string, params = {}) {
    const headers = this.HTTP_HEADERS_WITH_AUTH;
    const options = {headers, params, withCredentials: true};
    return this.httpClient.get(this.URL, options);
  }
}
