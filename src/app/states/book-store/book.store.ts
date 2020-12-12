import { GetItemsByPageRsp } from './../../models/resp';
import { StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { filter_page } from 'src/app/models/app-models';
import { PaginationOpt } from 'src/app/shared/page-pagination/page-pagination.component';

export interface BookState {
    book_list_view: GetItemsByPageRsp;
    detail_book: any;
    current_page: number,
    filter_page: filter_page,
    current_pagination_opt : PaginationOpt;
    authors: any[];
    categories: any[];
    suppliers: any[];
}

const initState = {
    book_list_view : null,
    selected_book: null,
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
    detail_book: {},
    authors: [],
    categories: [],
    suppliers: [],
}

@Injectable({providedIn: 'root'})
@StoreConfig({name:'book'})
export class BookStore extends EntityStore<BookState>{
    constructor() {
        super(initState);
    }
}
