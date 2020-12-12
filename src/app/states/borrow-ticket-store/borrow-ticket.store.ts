import { GetItemsByPageRsp } from '../../models/resp';
import { StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { filter_page } from 'src/app/models/app-models';
import { PaginationOpt } from 'src/app/shared/page-pagination/page-pagination.component';

export interface BorrowTicketState {
    borrow_ticket_list_view: GetItemsByPageRsp;
    detail_borrow_ticket: any;
    current_page: number,
    filter_page: filter_page,
    current_pagination_opt : PaginationOpt;
    authors: any[];
    categories: any[];
    suppliers: any[];
}

const initState = {
    borrow_ticket_list_view : null,
    selected_borrow_ticket: null,
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
    detail_borrow_ticket: {},
    authors: [],
    categories: [],
    suppliers: [],
}

@Injectable({providedIn: 'root'})
@StoreConfig({name:'borrowticket'})
export class BorrowTicketStore extends EntityStore<BorrowTicketState>{
    constructor() {
        super(initState);
    }
}
