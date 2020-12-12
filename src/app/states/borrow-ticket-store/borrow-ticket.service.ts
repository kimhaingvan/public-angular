import { filter_page } from 'src/app/models/app-models';
import { BorrowTicketQuery } from './borrow-ticket.query';
import { BorrowTicketStore } from './borrow-ticket.store';
import { GetItemsByPageRsp } from '../../models/resp';
import { ApiBorrowTicketService } from '../../API/api-borrow-ticket.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';
import { ApiCategoryService } from 'src/app/API/api-book-category.service';

@Injectable({
    providedIn: 'root'
})
export class BorrowTicketService {
    constructor(private borrowTicketApiService: ApiBorrowTicketService, private borrowTicketStore: BorrowTicketStore, private borrowTicketQuery: BorrowTicketQuery, private categoryApiService: ApiCategoryService, private authorApiService: ApiAuthorService, private supplierApiService: ApiSupplierService) {
    }

    async getBorrowTickets(filter) {
        let res: GetItemsByPageRsp = await this.borrowTicketApiService.GetBorrowTickets(filter);
        this.borrowTicketStore.update({
            borrow_ticket_list_view: res,
        })
    }

    setupPagination() {
        this.borrowTicketStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.borrowTicketQuery.getValue().borrow_ticket_list_view.has_next,
                previousDisabled: !this.borrowTicketQuery.getValue().borrow_ticket_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.borrowTicketQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.borrowTicketStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.borrowTicketStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.borrowTicketStore.update({current_page: this.borrowTicketQuery.getValue().current_page <= 0 ? 1 :  this.borrowTicketQuery.getValue().current_page});
        let currentPage = this.borrowTicketQuery.getValue().current_page <= 0 ? 1 : this.borrowTicketQuery.getValue().current_page;
        let filter = {
            ...this.borrowTicketQuery.getValue().filter_page,
            page: currentPage
        };
        this.borrowTicketStore.update({filter_page: filter});
    }

    async searchBorrowTickets(req) {
        return await this.borrowTicketApiService.SearchBorrowTickets(req);
    }

    setDetailBorrowTicket(borrow_ticket) {
        this.borrowTicketStore.update({detail_borrow_ticket: borrow_ticket})
    }

    async DeleteBorrowTicketById(id) {
        return await this.borrowTicketApiService.DeleteBorrowTicket({borrow_ticket_id: id});
    }

    async UpdateBorrowTicket(borrowticket) {
        return await this.borrowTicketApiService.UpdateBorrowTicket(borrowticket);
    }

    async FinishBorrowTicket(borrow_ticket_id) {
        const req = {
            borrow_ticket_id: borrow_ticket_id
        }
        return await this.borrowTicketApiService.FinishBorrowTicket(req);
    }

    async SendEmailForLateTicket(email, message){

    }
    async GetCategories(filter) {
        let category_res = await this.categoryApiService.GetCategories(filter);
        this.borrowTicketStore.update({categories: category_res['items']})
    }

    async GetAuthors(filter) {
        let author_res = await this.authorApiService.GetAuthors(filter);
        this.borrowTicketStore.update({authors: author_res['items']});
    }

    async GetSuppliers(filter) {
        let supplier_res = await this.supplierApiService.GetSuppliers(filter)
        this.borrowTicketStore.update({suppliers: supplier_res['items']});
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

    async CreateBorrowTicket(borrowticket) {
        return await this.borrowTicketApiService.CreateBorrowTicket(borrowticket)
    }

    async SendEmailForLateBorrowTicket(info) {
      return await this.borrowTicketApiService.SendEmailForLateBorrowTicket(info)
    }
}
