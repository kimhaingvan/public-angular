import {Component, Input, OnInit} from '@angular/core';
import {ModalAction} from "../../../../../../../core/modal-controller/modal-action.service";
import {BorrowTicketQuery} from "../../../../../../../states/borrow-ticket-store/borrow-ticket.query";
import {BorrowTicketService} from "../../../../../../../states/borrow-ticket-store/borrow-ticket.service";

@Component({
  selector: 'app-send-email-modal',
  templateUrl: './send-email-modal.component.html',
  styleUrls: ['./send-email-modal.component.scss']
})
export class SendEmailModalComponent implements OnInit {
  message = '';
  detail_borrow_ticket$ = this.borrowTicketQuery.select('detail_borrow_ticket');
  constructor(
    private modalAction: ModalAction,
    private borrowTicketQuery: BorrowTicketQuery,
    private borrowTicketService: BorrowTicketService,

  ) { }

  ngOnInit(): void {
    console.log(this.borrowTicketQuery.getValue().detail_borrow_ticket.customer.email)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }

  sendEmail() {
    if(!this.message) return toastr.error('Vui lòng nhập nội dung lời nhắn!');
    this.modalAction.dismiss(this.message)
  }
}
