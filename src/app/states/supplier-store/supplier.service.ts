import { SupplierStore } from './supplier.store';
import { ApiCategoryService } from '../../API/api-book-category.service';
import { filter_page } from 'src/app/models/app-models';
import { GetItemsByPageRsp } from '../../models/resp';
import { ApiBookService } from '../../API/api-book.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';
import { SupplierQuery } from './supplier.query';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    constructor(private supplierApiService: ApiSupplierService, private supplierStore: SupplierStore, private supplierQuery: SupplierQuery, private categoryApiService: ApiCategoryService, private authorApiService: ApiAuthorService) {
    }

    async GetSuppliers(filter) {
        let res: GetItemsByPageRsp = await this.supplierApiService.GetSuppliers(filter);
        this.supplierStore.update({
            supplier_list_view: res,
        })
    }

    setupPagination() {
        this.supplierStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.supplierQuery.getValue().supplier_list_view.has_next,
                previousDisabled: !this.supplierQuery.getValue().supplier_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.supplierQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.supplierStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.supplierStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.supplierStore.update({current_page: this.supplierQuery.getValue().current_page <= 0 ? 1 :  this.supplierQuery.getValue().current_page});
        let currentPage = this.supplierQuery.getValue().current_page <= 0 ? 1 : this.supplierQuery.getValue().current_page;
        let filter = {
            ...this.supplierQuery.getValue().filter_page,
            page: currentPage
        };
        this.supplierStore.update({filter_page: filter});
    }

    async SearchSuppliers(req) {
        return await this.supplierApiService.SearchSuppliers(req);
    }

    SetDetailSupplier(supplier) {
        this.supplierStore.update({detail_supplier: supplier})
    }

    async DeleteSupplierById(id) {
        return await this.supplierApiService.DeleteSupplier({supplier_id: id});
    }

    async UpdateSupplier(supplier) {
        return await this.supplierApiService.UpdateSupplier(supplier);
    }

    async CreateSupplier(supplier) {
        return await this.supplierApiService.CreateSupplier(supplier)
    }
}