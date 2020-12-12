import { ModalController } from './../../../../../../../core/modal-controller/modal-controller.service';
import { BorrowTicketQuery } from './../../../../../../../states/borrow-ticket-store/borrow-ticket.query';
import { BorrowTicketService } from './../../../../../../../states/borrow-ticket-store/borrow-ticket.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ConfirmFinishBorrowTicketModalComponent } from '../confirm-finish-borrow-ticket-modal/confirm-finish-borrow-ticket-modal.component';

@Component({
  selector: 'app-borrow-ticket-row',
  templateUrl: './borrow-ticket-row.component.html',
  styleUrls: ['./borrow-ticket-row.component.scss']
})
export class BorrowTicketRowComponent implements OnInit, OnChanges {
  @Input() borrow_ticket_item;
  @Input() index;

  borrow_status: any =  "Hoàn thành"  || "Trả trễ" || "Đang trễ" || "Đang mượn";
  constructor(
    private borrowTicketService: BorrowTicketService,
    private borrowTicketQuery: BorrowTicketQuery,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    const current_date = new Date().getTime();
    const return_date = new Date(this.borrow_ticket_item.return_date).getTime();
    const appointment_date = new Date(this.borrow_ticket_item.appointment_date).getTime();
    if((!return_date && (current_date <= appointment_date))) {this.borrow_status =  "Đang mượn";}
    if((return_date && (return_date <= appointment_date))) {this.borrow_status =  "Hoàn thành";}
    if((!return_date && (current_date > appointment_date))) {this.borrow_status =  "Đang trễ";}
    if((return_date && (return_date > appointment_date))) {this.borrow_status =  "Trả trễ";}
  }

  async FinishBorrowTicket() {
    const modal = this.modalController.create({
      component: ConfirmFinishBorrowTicketModalComponent,
      componentProps: {
        borrow_ticket_id: this.borrow_ticket_item.borrow_ticket_id
      },
    });
    modal.show().then();
    modal.onDismiss().then(async borrow_ticket_id => {
      if(borrow_ticket_id) {
        try {
          await this.borrowTicketService.FinishBorrowTicket(this.borrow_ticket_item.borrow_ticket_id);
          await this.borrowTicketService.getBorrowTickets(this.borrowTicketQuery.getValue().filter_page)
          toastr.success("Hoàn thành phiếu mượn sách thành công")
        } catch(e) {
          toastr.error("Hoàn thành phiếu mượn sáchkhông thành thông", e.msg || e.message)
        }
      }
    });
    
  }
}
