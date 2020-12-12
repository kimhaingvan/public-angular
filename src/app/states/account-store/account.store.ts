import { account, auth_info } from './../../models/app-models';
import { GetItemsByPageRsp } from '../../models/resp';
import { StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { filter_page } from 'src/app/models/app-models';
import { PaginationOpt } from 'src/app/shared/page-pagination/page-pagination.component';

export interface AccountState {
    account_list_view: GetItemsByPageRsp;
    current_page: number,
    filter_page: filter_page,
    current_pagination_opt : PaginationOpt;
    auth_info: auth_info;
    detail_account: any
}

const initState = {
    auth_info: null,
    account_list_view : null,
    current_page : 1,
    filter_page: {
        page: 1,
          per_page: 20,
    },
    current_pagination_opt: {
        nextDisabled: false,
        previousDisabled: true,
        hidePerpage: true,
    },
    detail_account: null
}

@Injectable({providedIn: 'root'})
@StoreConfig({name:'account', resettable: true})
export class AccountStore extends EntityStore<AccountState>{
    constructor() {
        super(initState);
    }
}
