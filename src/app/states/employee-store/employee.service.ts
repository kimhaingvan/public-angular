import { EmployeeStore } from './employee.store';
import { ApiEmployeeService } from './../../API/api-employee.service';
import { ApiCategoryService } from '../../API/api-book-category.service';
import { filter_page } from 'src/app/models/app-models';
import { GetItemsByPageRsp } from '../../models/resp';
import { ApiBookService } from '../../API/api-book.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';
import { EmployeeQuery } from './employee.query';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private employeeApiService: ApiEmployeeService, private employeeStore: EmployeeStore, private employeeQuery: EmployeeQuery, private categoryApiService: ApiCategoryService, private authorApiService: ApiAuthorService, private supplierApiService: ApiSupplierService) {
    }

    async GetEmployees(filter) {
        let res: GetItemsByPageRsp = await this.employeeApiService.GetEmployees(filter);
        this.employeeStore.update({
            employee_list_view: res,
        })
    }

    setupPagination() {
        this.employeeStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.employeeQuery.getValue().employee_list_view.has_next,
                previousDisabled: !this.employeeQuery.getValue().employee_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.employeeQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.employeeStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.employeeStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.employeeStore.update({current_page: this.employeeQuery.getValue().current_page <= 0 ? 1 :  this.employeeQuery.getValue().current_page});
        let currentPage = this.employeeQuery.getValue().current_page <= 0 ? 1 : this.employeeQuery.getValue().current_page;
        let filter = {
            ...this.employeeQuery.getValue().filter_page,
            page: currentPage
        };
        this.employeeStore.update({filter_page: filter});
    }

    async SearchEmployees(req) {
        return await this.employeeApiService.SearchEmployees(req);
    }

    SetDetailEmployee(employee) {
        this.employeeStore.update({detail_employee: employee})
    }

    async DeleteEmployeeById(id) {
        return await this.employeeApiService.DeleteEmployee({employee_id: id});
    }

    async UpdateEmployee(employee) {
        return await this.employeeApiService.UpdateEmployee(employee);
    }

    async CreateEmployee(employee) {
        return await this.employeeApiService.CreateEmployee(employee)
    }
}