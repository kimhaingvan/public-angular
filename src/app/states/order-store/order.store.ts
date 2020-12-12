import { GetItemsByPageRsp } from '../../models/resp';
import { StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { filter_page } from 'src/app/models/app-models';
import { PaginationOpt } from 'src/app/shared/page-pagination/page-pagination.component';

export interface OrderState {
    order_list_view: GetItemsByPageRsp;
    detail_order: any;
    current_page: number,
    filter_page: filter_page,
    current_pagination_opt : PaginationOpt;
    authors: any[];
    categories: any[];
    suppliers: any[];
    dashboard: any;
}

const initState = {
    order_list_view : null,
    selected_order: null,
    current_page : 1,
    filter_page: {
        page: 1,
        per_page: 5,
    },
    current_pagination_opt: {
        nextDisabled: false,
        previousDisabled: true,
        hidePerpage: true,
    },
    detail_order: {},
    authors: [],
    categories: [],
    suppliers: [],
    dashboard: {},
}

@Injectable({providedIn: 'root'})
@StoreConfig({name:'order'})
export class OrderStore extends EntityStore<OrderState>{
    constructor() {
        super(initState);
    }
}
