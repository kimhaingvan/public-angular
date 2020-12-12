import { EmployeeState, EmployeeStore } from './employee.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
export class EmployeeQuery extends Query<EmployeeState> {
    constructor(protected store: EmployeeStore) {
        super(store);
    }

    employee_list_view$ = this.select('employee_list_view')
    detail_employee$ = this.select('detail_employee')
    current_page$ = this.select('current_page')
    current_pagination_opt$ = this.select('current_pagination_opt')
}
