import { BookState, BookStore } from './book.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
export class BookQuery extends Query<BookState> {
    constructor(protected store: BookStore) {
        super(store);
    }
    book_list_view$ = this.select('book_list_view')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
    detail_book$ = this.select('detail_book')
    suppliers$ = this.select('suppliers')
    categories$ = this.select('categories')
    authors$ = this.select('authors')
}
