import { auth_info } from './../../models/app-models';
import { Router } from '@angular/router';
import {  AccountQuery } from './account.query';
import {  AccountStore } from './account.store';
import { GetItemsByPageRsp } from '../../models/resp';
import { ApiBookService } from '../../API/api-book.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';
import { ApiAccountService } from 'src/app/API/api-account.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private accountApiService: ApiAccountService,
        private accountStore: AccountStore,
        private accountQuery: AccountQuery,
        private router: Router
        ) {
    }

    UploadAccountFromLocalStorageToStore() {
        this.accountStore.update({
            auth_info: JSON.parse(localStorage.getItem('auth_info'))
        })
    }

    async GetAccounts(filter) {
        let res: GetItemsByPageRsp = await this.accountApiService.GetAccounts(filter);
        this.accountStore.update({
            account_list_view: res,
        })
    }

    setupPagination() {
        this.accountStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.accountQuery.getValue().account_list_view.has_next,
                previousDisabled: !this.accountQuery.getValue().account_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.accountQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.accountStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.accountStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.accountStore.update({current_page: this.accountQuery.getValue().current_page <= 0 ? 1 :  this.accountQuery.getValue().current_page});
        let currentPage = this.accountQuery.getValue().current_page <= 0 ? 1 : this.accountQuery.getValue().current_page;
        let filter = {
            ...this.accountQuery.getValue().filter_page,
            page: currentPage
        };
        this.accountStore.update({filter_page: filter});
    }

    async SearchAccounts(req) {
        return await this.accountApiService.SearchAccounts(req);
    }


    async DeleteAccountById(id) {
        return await this.accountApiService.DeleteAccount({account_id: id});
    }

    async UpdateAccount(account) {
        return await this.accountApiService.UpdateAccount(account);
    }

    async CreateAccount(account) {
        return await this.accountApiService.CreateAccount(account)
    }

    async CreateAccountAndCustomer(info) {
        return await this.accountApiService.CreateAccountAndCustomer(info)
    }

    async CreateAccountAndEmployee(info) {
        return await this.accountApiService.CreateAccountAndEmployee(info)
    }

    async Login(loginReq) {
        let login_res: auth_info = await this.accountApiService.Login(loginReq);
        this.accountStore.update({
            auth_info: login_res,
        })
        localStorage.setItem('auth_info', JSON.stringify(this.accountQuery.getValue().auth_info));
    }

    async SessionInfo() {
      return await this.accountApiService.CheckToken();
    }
    Logout() {
        this.accountStore.reset();
        localStorage.removeItem('auth_info')
        this.router.navigateByUrl('/book-store');
        toastr.warning("Bạn đã đăng xuất khỏi tài khoản !", "Đăng xuất thành công")
    }

    async SendResetPasswordEmailCustomer(email) {
        return await this.accountApiService.SendResetPasswordEmailCustomer(email)
    }

    async SendResetPasswordEmailEmployee(email) {
        return await this.accountApiService.SendResetPasswordEmailEmployee(email)
    }

    async ResetPassword(req) {
        return await this.accountApiService.ResetPassword(req)
    }

    async ChangePassword(req) {
        return await this.accountApiService.ChangePassword(req)
    }

    SetDetailAccount(account) {
        this.accountStore.update({detail_account: account})
    }
}
