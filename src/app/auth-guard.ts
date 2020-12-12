import { AccountStore } from './states/account-store/account.store';
import { AccountQuery } from './states/account-store/account.query';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import {take, map, tap,} from 'rxjs/operators';
import {AccountService} from "./states/account-store/account.service";

@Injectable({ providedIn: 'root' })
export class AdminPageGuard implements CanActivate{
    constructor(private accountQuery: AccountQuery, private router: Router, private accountStore: AccountStore, private accountService: AccountService){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this.accountQuery.auth_info$?.pipe(
            take(1),
            tap(async auth => {
              let result = await this.accountService.SessionInfo();
              if(result.authenticated == false) {
                toastr.error(result.message)
                localStorage.removeItem('auth_info');
              }
            }),
            map(auth => {
              if(localStorage.getItem('auth_info')){
                  const auth_info = JSON.parse(localStorage.getItem('auth_info'));

                if(auth_info.access_token && (auth_info.current_account.role.role_name == "admin" || auth_info.current_account.role.role_name == "admin-manager"|| auth_info.current_account.role.role_name == "admin manager")){
                    this.accountStore.update({
                        auth_info: auth_info,
                    })
                    return true;
                }
               }
              localStorage.removeItem('auth_info');
               return this.router.createUrlTree(['/admin/login']);
            })
        )
    }
}
