import { BorrowTicketState, BorrowTicketStore } from './borrow-ticket.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
export class BorrowTicketQuery extends Query<BorrowTicketState> {
    constructor(protected store: BorrowTicketStore) {
        super(store);
    }
    borrow_ticket_list_view$ = this.select('borrow_ticket_list_view')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
    detail_borrow_ticket$ = this.select('detail_borrow_ticket')
    suppliers$ = this.select('suppliers')
    categories$ = this.select('categories')
    authors$ = this.select('authors')
}
