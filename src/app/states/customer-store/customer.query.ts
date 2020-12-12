import { CustomerState, CustomerStore } from './customer.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
export class CustomerQuery extends Query<CustomerState> {
    constructor(protected store: CustomerStore) {
        super(store);
    }

    customer_list_view$ = this.select('customer_list_view')
    detail_customer$ = this.select('detail_customer')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
}
