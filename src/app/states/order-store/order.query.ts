import { OrderState, OrderStore } from './order.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
export class OrderQuery extends Query<OrderState> {
    constructor(protected store: OrderStore) {
        super(store);
    }
    order_list_view$ = this.select('order_list_view')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
    detail_order$ = this.select('detail_order')
    suppliers$ = this.select('suppliers')
    categories$ = this.select('categories')
    authors$ = this.select('authors')
    dashboard$ = this.select('dashboard')
}
