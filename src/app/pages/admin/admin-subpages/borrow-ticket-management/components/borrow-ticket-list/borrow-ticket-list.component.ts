import { async } from '@angular/core/testing';
import { BorrowTicketStore } from '../../../../../../states/borrow-ticket-store/borrow-ticket.store';
import { BorrowTicketQuery } from '../../../../../../states/borrow-ticket-store/borrow-ticket.query';
import { BorrowTicketService } from '../../../../../../states/borrow-ticket-store/borrow-ticket.service';
import { Router } from '@angular/router';
import { PaginationOpt, NavigationDirection } from '../../../../../../shared/page-pagination/page-pagination.component';
import { Subject } from 'rxjs';
import { ApiBorrowTicketService } from '../../../../../../API/api-borrow-ticket.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-borrow-ticket-list',
  templateUrl: './borrow-ticket-list.component.html',
  styleUrls: ['./borrow-ticket-list.component.scss']
})
export class BorrowTicketListComponent implements OnInit {
  borrow_ticket_list$ = this.borrowTicketQuery.borrow_ticket_list_view$;
  current_pagination_opt$ = this.borrowTicketQuery.current_pagination_opt$;
  current_page$ = this.borrowTicketQuery.current_page$;
  currentPaginationOpt = new PaginationOpt();

  constructor(private router: Router, private borrowTicketService: BorrowTicketService, private borrowTicketQuery: BorrowTicketQuery, private borrowTicketStore: BorrowTicketStore, private ref: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.onRequestNewPage();
  }

  async onRequestNewPage() {
    await this.borrowTicketService.getBorrowTickets(this.borrowTicketQuery.getValue().filter_page).then(() => {
      this.borrowTicketService.setupPagination();
    })
  }

  async navigate(direction) {
    this.borrowTicketService.navigate(direction);
    await this.onRequestNewPage()
  }

  onViewBorrowTicketDetail(borrow_ticket_id) {
    this.router.navigateByUrl(`/admin/borrow-ticket-management/borrow-ticket-detail/${borrow_ticket_id}`);
  }
}