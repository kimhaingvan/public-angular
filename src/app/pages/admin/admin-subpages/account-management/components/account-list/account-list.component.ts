import { AccountService } from '../../../../../../states/account-store/account.service';
import { AccountStore } from '../../../../../../states/account-store/account.store';
import { AccountQuery } from '../../../../../../states/account-store/account.query';
import { Router } from '@angular/router';
import { PaginationOpt } from '../../../../../../shared/page-pagination/page-pagination.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  account_list$ = this.accountQuery.account_list_view$;
  current_pagination_opt$ = this.accountQuery.current_pagination_opt$;
  current_page$ = this.accountQuery.current_page$;
  currentPaginationOpt = new PaginationOpt();

  constructor(
    private router: Router, 
    private ref: ChangeDetectorRef,
    private accountQuery: AccountQuery,
    private accountStore: AccountStore,
    private accountService: AccountService) { }

  async ngOnInit() {
    await this.onRequestNewPage();
  }

  async onRequestNewPage() {
    await this.accountService.GetAccounts(this.accountQuery.getValue().filter_page).then(() => {
      this.accountService.setupPagination();
    })
  }

  async navigate(direction) {
    this.accountService.navigate(direction);
    await this.onRequestNewPage()
  }

  onViewAccountDetail(account_id) {
    this.router.navigateByUrl(`/admin/account-management/account-detail/${account_id}`);
  }
}
