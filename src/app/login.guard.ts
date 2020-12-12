import { AccountQuery } from './states/account-store/account.query';
import { auth_info, account } from './models/app-models';
import { AccountService } from 'src/app/states/account-store/account.service';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginViewGuard implements CanActivate{ 
    constructor(private accountService: AccountService, private router: Router, private accountQuery: AccountQuery){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this.accountQuery.auth_info$.pipe(
            take(1),
            map(auth_info => {
              // let role_id_acc = JSON.parse(localStorage.getItem('auth_info')).current_account.role.role_id;
              if(!localStorage.getItem('auth_info')){
                return true;
              }
              return this.router.createUrlTree(['book-store']);
            })
        );
    }
}
