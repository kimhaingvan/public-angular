import { SupplierState, SupplierStore } from './supplier.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
export class SupplierQuery extends Query<SupplierState> {
    constructor(protected store: SupplierStore) {
        super(store);
    }

    supplier_list_view$ = this.select('supplier_list_view')
    detail_supplier$ = this.select('detail_supplier')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
}
