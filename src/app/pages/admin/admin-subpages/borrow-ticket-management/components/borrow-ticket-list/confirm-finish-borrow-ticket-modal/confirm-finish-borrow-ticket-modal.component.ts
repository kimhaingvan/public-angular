import { ModalAction } from './../../../../../../../core/modal-controller/modal-action.service';
import { BorrowTicketService } from './../../../../../../../states/borrow-ticket-store/borrow-ticket.service';
import { Component, OnInit, Input } from '@angular/core';
import { BorrowTicketQuery } from 'src/app/states/borrow-ticket-store/borrow-ticket.query';

@Component({
  selector: 'app-confirm-finish-borrow-ticket-modal',
  templateUrl: './confirm-finish-borrow-ticket-modal.component.html',
  styleUrls: ['./confirm-finish-borrow-ticket-modal.component.scss']
})
export class ConfirmFinishBorrowTicketModalComponent implements OnInit {
  @Input() borrow_ticket_id;
  constructor(
    private modalAction: ModalAction
  ) { }

  ngOnInit() {
  }

  OnFinishBorrowTicket() {
    this.modalAction.dismiss(this.borrow_ticket_id)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
