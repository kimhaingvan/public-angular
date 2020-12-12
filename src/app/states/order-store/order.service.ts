import { filter_page } from 'src/app/models/app-models';
import { OrderQuery } from './order.query';
import { OrderStore } from './order.store';
import { GetItemsByPageRsp } from '../../models/resp';
import { ApiOrderService } from '../../API/api-order.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';
import { ApiCategoryService } from 'src/app/API/api-book-category.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private orderApiService: ApiOrderService, private orderStore: OrderStore, private orderQuery: OrderQuery, private categoryApiService: ApiCategoryService, private authorApiService: ApiAuthorService, private supplierApiService: ApiSupplierService) {
    }

    async getOrders(filter) {
        let res: GetItemsByPageRsp = await this.orderApiService.GetOrders(filter);
        this.orderStore.update({
            order_list_view: res,
        })
    }

    setupPagination() {
        this.orderStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.orderQuery.getValue().order_list_view.has_next,
                previousDisabled: !this.orderQuery.getValue().order_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.orderQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.orderStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.orderStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.orderStore.update({current_page: this.orderQuery.getValue().current_page <= 0 ? 1 :  this.orderQuery.getValue().current_page});
        let currentPage = this.orderQuery.getValue().current_page <= 0 ? 1 : this.orderQuery.getValue().current_page;
        let filter = {
            ...this.orderQuery.getValue().filter_page,
            page: currentPage
        };
        this.orderStore.update({filter_page: filter});
    }

    async searchOrders(req) {
        return await this.orderApiService.SearchOrders(req);
    }

    setDetailOrder(order) {
        this.orderStore.update({detail_order: order})
    }

    async DeleteOrderById(id) {
        return await this.orderApiService.DeleteOrder({order_id: id});
    }

    async UpdateOrder(order) {
        return await this.orderApiService.UpdateOrder(order);
    }


    async GetCategories(filter) {
        let category_res = await this.categoryApiService.GetCategories(filter);
        this.orderStore.update({categories: category_res['items']})
    }

    async GetAuthors(filter) {
        let author_res = await this.authorApiService.GetAuthors(filter);
        this.orderStore.update({authors: author_res['items']});
    }

    async GetSuppliers(filter) {
        let supplier_res = await this.supplierApiService.GetSuppliers(filter)
        this.orderStore.update({suppliers: supplier_res['items']});
    }

    async CreateAuthor(author) {
        return await this.authorApiService.CreateAuthor(author)
    }
    async CreateCategory(category) {
        return await this.categoryApiService.CreateCategory(category)
    }
    async CreateSupplier(supplier) {
        return await this.supplierApiService.CreateSupplier(supplier)
    }

    async CreateOrder(order) {
        return await this.orderApiService.CreateOrder(order)
    }

    async statistic() {
      let dashboard = await this.orderApiService.statistic();
      this.orderStore.update({dashboard:dashboard})
      return dashboard
    }
}
