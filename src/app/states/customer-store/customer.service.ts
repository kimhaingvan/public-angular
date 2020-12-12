import { ApiCustomerService } from './../../API/api-customer.service';
import { ApiCategoryService } from '../../API/api-book-category.service';
import { filter_page } from 'src/app/models/app-models';
import { CustomerQuery } from './customer.query';
import { CustomerStore } from './customer.store';
import { GetItemsByPageRsp } from '../../models/resp';
import { ApiBookService } from '../../API/api-book.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private customerApiService: ApiCustomerService, private customerStore: CustomerStore, private customerQuery: CustomerQuery, private categoryApiService: ApiCategoryService, private authorApiService: ApiAuthorService, private supplierApiService: ApiSupplierService) {
    }

    async GetCustomers(filter) {
        let res: GetItemsByPageRsp = await this.customerApiService.GetCustomers(filter);
        this.customerStore.update({
            customer_list_view: res,
        })
    }

    setupPagination() {
        this.customerStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.customerQuery.getValue().customer_list_view.has_next,
                previousDisabled: !this.customerQuery.getValue().customer_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.customerQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.customerStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.customerStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.customerStore.update({current_page: this.customerQuery.getValue().current_page <= 0 ? 1 :  this.customerQuery.getValue().current_page});
        let currentPage = this.customerQuery.getValue().current_page <= 0 ? 1 : this.customerQuery.getValue().current_page;
        let filter = {
            ...this.customerQuery.getValue().filter_page,
            page: currentPage
        };
        this.customerStore.update({filter_page: filter});
    }

    async SearchCustomers(req) {
        return await this.customerApiService.SearchCustomers(req);
    }

    SetDetailCustomer(customer) {
        this.customerStore.update({detail_customer: customer})
    }

    async DeleteCustomerById(id) {
        return await this.customerApiService.DeleteCustomer({customer_id: id});
    }

    async UpdateCustomer(customer) {
        return await this.customerApiService.UpdateCustomer(customer);
    }

    async CreateCustomer(customer) {
        return await this.customerApiService.CreateCustomer(customer)
    }

    async SearchOrdersByCustomerId(customer_id) {
        return await this.customerApiService.SearchOrdersByCustomerId(customer_id)
    }
}