import { auth_info } from './../../models/app-models';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AccountState, AccountStore } from './account.store';

@Injectable({
    providedIn: 'root',
})
export class AccountQuery extends Query<AccountState> {
    constructor(protected store: AccountStore) {
        super(store);
    }

    account_list_view$ = this.select('account_list_view')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
    auth_info$ = this.select('auth_info')
    detail_account$ = this.select('detail_account')
}
