import { AccountQuery } from './../states/account-store/account.query';
import { AccountStore } from 'src/app/states/account-store/account.store';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

declare var __debug_host: string;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private accountQuery: AccountQuery,
    @Optional() @Inject("SERVICE_URL") private SERVICE_URL: string
  ) {}

  createHeader(token?: string) {
    const jwt = token || this.accountQuery.getValue()?.auth_info?.access_token || JSON.parse(localStorage.getItem('auth_info'))?.access_token;
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + jwt)
      .set('Content-Type', 'application/json');
  }

  createDefaultOption(headers?: any) {
    return {
      headers: headers || this.createHeader(),
      params: null,
      observe: 'response'
    };
  }

  get(link, query?: object, token?: string): Observable<any> {
    const options = this.createDefaultOption(this.createHeader(token));

    if (query) {
      let params = new HttpParams();
      (<any>Object).entries(query).forEach(entry => {
        const key = entry[0],
          value = entry[1];

        if (Array.isArray(value)) {
          value.forEach(val => {
            params = params.append(`${key}`, val);
          });
        } else {
          params = params.set(key, value);
        }
      });
      options.params = params;
    }
    return this.getWithOptions(link, options);
  }

  post(link, data, token?: string): Observable<any> {
    const options = this.createDefaultOption(this.createHeader(token));
    return this.postWithOptions(link, data, options);
  }

  put(link, data?: any, token?: string): Observable<any> {
    const headers = this.createHeader(token);
    const options = { headers: headers };
    return this.putWithOptions(link, data || {}, options);
  }


  delete(link, token?: string): Observable<any> {
    const options = this.createDefaultOption(this.createHeader(token));
    return this.deleteWithOptions(link, options);
  }

  postWithOptions(link, data, options): Observable<any> {
    return this.http.post(this.getUrl(link), data, options).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getWithOptions(link, options): Observable<any> {
    return this.http.get(this.getUrl(link), options).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  putWithOptions(link, data, options): Observable<any> {
    return this.http.put(this.getUrl(link), data, options).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteWithOptions(link, options): Observable<any> {
    return this.http.delete(this.getUrl(link), options).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private getUrl(link) {
    let host = !/http(s?)/i.test(link) && (__debug_host || this.SERVICE_URL) || '';
    if (host) {
      if (!host.startsWith('http')) {
        let url = window.location.href;
        let arr = url.split('/');
        host = arr[0] + '//' + host;
      }
      if (!host.endsWith('/')) {
        host = host + '/';
      }
    }
    if (link.startsWith('/')) {
      link = link.slice(1);
    }
    return `${host}${link}`;
  }

  private extractData(res) {
    if ((res.status >= 200 && res.status < 300) || res.result) {
      return res.body || res.result;
    }
    throw res;
  }

  private handleError(error: HttpErrorResponse) {
    // In a real world app, you might use a remote logging infrastructure
    let code = error.error.code;
    let message = error.error.msg;
    let meta = error.error.meta;

    if (!message) {
      switch (error.status) {
        case 404:
          code = 404;
          message = 'Không tìm thấy api';
          break;
      }
    }

    const errMsg = {
      code,
      message,
      meta
    };
    return throwError(errMsg);
  }

}
