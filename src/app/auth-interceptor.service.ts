import { auth_info } from './models/app-models';
import { AccountQuery } from './states/account-store/account.query';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

constructor(private accountQuery: AccountQuery) { }

intercept(req: HttpRequest<any>, next: HttpHandler){
  return this.accountQuery.auth_info$.pipe(
    take(1),
    exhaustMap(auth_info => {
      if(!auth_info){
        return next.handle(req);
      }
      const modifiedReq = req.clone({
        params: new HttpParams().set('Authorization', "Bearer " + JSON.parse(localStorage.getItem('auth_info')).access_token),
      });
      return next.handle(modifiedReq);
    })
  )
}
}
