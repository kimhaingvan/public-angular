import { BorrowTicketStore } from '../../../../../../states/borrow-ticket-store/borrow-ticket.store';
import { BorrowTicketQuery } from 'src/app/states/borrow-ticket-store/borrow-ticket.query';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { ModalController } from '../../../../../../core/modal-controller/modal-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiBorrowTicketService } from '../../../../../../API/api-borrow-ticket.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BorrowTicketService } from 'src/app/states/borrow-ticket-store/borrow-ticket.service';
import { ConfirmFinishBorrowTicketModalComponent } from '../borrow-ticket-list/confirm-finish-borrow-ticket-modal/confirm-finish-borrow-ticket-modal.component';
import {SendEmailModalComponent} from "./send-email-modal/send-email-modal.component";

@Component({
  selector: 'app-borrow-ticket-detail',
  templateUrl: './borrow-ticket-detail.component.html',
  styleUrls: ['./borrow-ticket-detail.component.scss']
})
export class BorrowTicketDetailComponent implements OnInit, OnChanges {
  filter = {
    page : 1,
    per_page: 1000
  }

  borrow_status: any =  "Hoàn thành"  || "Trả trễ" || "Đang trễ" || "Đang mượn";
  isEditing = false;
  detail_borrow_ticket$ = this.borrowTicketQuery.detail_borrow_ticket$;
  isSendEmail = false;

  constructor(
    private borrowTicketQuery: BorrowTicketQuery,
    private borrowTicketService: BorrowTicketService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private borrowTicketStore: BorrowTicketStore) { }

    updateBorrowTicketForm = this.fb.group({
      borrow_ticket_id: [''],
      borrow_ticket_name: [''],
      author:[''],
      supplier: [''],
      category: [''],
      page_number: [''],
      cost_price: [''],
      retail_price: [''],
      discount: [''],
      old_amount: [''],
      new_amount: [''],
      description: [''],
      note: [''],
    });

  async ngOnInit() {
    await this.SetupData()
  }

  async ngOnChanges() {
  }

  async SetupData() {
    const borrow_ticket_id = {
      borrow_ticket_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.borrowTicketService.searchBorrowTickets(borrow_ticket_id);
    const detail_borrow_ticket = res.borrow_tickets[0];

    this.borrowTicketService.setDetailBorrowTicket(detail_borrow_ticket);

    const current_date = new Date().getTime();
    const return_date = new Date(this.borrowTicketQuery.getValue().detail_borrow_ticket.return_date).getTime();
    const appointment_date = new Date(this.borrowTicketQuery.getValue().detail_borrow_ticket.appointment_date).getTime();
    if((!return_date && (current_date <= appointment_date))) {this.borrow_status =  "Đang mượn";}
    if((return_date && (return_date <= appointment_date))) {this.borrow_status =  "Hoàn thành";}
    if((!return_date && (current_date > appointment_date))) {this.borrow_status =  "Đang trễ";}
    if((return_date && (return_date > appointment_date))) {this.borrow_status =  "Trả trễ";}
  }

  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_borrow_ticket = this.updateBorrowTicketForm.value;
      await this.borrowTicketService.UpdateBorrowTicket(update_borrow_ticket)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }

  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/borrow-ticket-management/borrow-ticket-list')
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteModalComponent,
      componentProps: {
        borrow_ticket: this.borrowTicketQuery.getValue().detail_borrow_ticket
      },
    });
    modal.show().then();
    modal.onDismiss().then(delete_borrow_ticket => {
      if(delete_borrow_ticket) {
        try {
          this.borrowTicketService.DeleteBorrowTicketById(delete_borrow_ticket.borrow_ticket_id)
          this.router.navigateByUrl('admin/borrow-ticket-management/borrow-ticket-list')
          toastr.success("Bạn đã hủy phiếu mượn sách thành công")
        } catch(e) {
          toastr.error("Bạn đã hủy phiếu mượn sách không thành thông", e.msg || e.message)
        }
      }
    });
  }

  setupDataForm() {
    let store_detail_borrow_ticket = this.borrowTicketQuery.getValue().detail_borrow_ticket;
    this.updateBorrowTicketForm.patchValue({
      'borrow_ticket_id': store_detail_borrow_ticket?.borrow_ticket_id,
      'borrow_ticket_name': store_detail_borrow_ticket?.borrow_ticket_name,
      'author': store_detail_borrow_ticket?.author,
      'supplier': store_detail_borrow_ticket?.supplier,
      'category': store_detail_borrow_ticket?.category,
      'page_number': store_detail_borrow_ticket?.page_number,
      'cost_price':  store_detail_borrow_ticket?.cost_price,
      'retail_price':store_detail_borrow_ticket?.retail_price,
      'discount':store_detail_borrow_ticket?.discount,
      'description': store_detail_borrow_ticket?.description,
      'old_amount': store_detail_borrow_ticket?.old_amount,
      'new_amount': store_detail_borrow_ticket?.new_amount,
      'note': store_detail_borrow_ticket?.note,
    });

  }


  async UpdateBorrowTicket() {
    let update_borrow_ticket = this.updateBorrowTicketForm.value;
    let update_req = {
      ...update_borrow_ticket,
      category_id: update_borrow_ticket.category.category_id,
      supplier_id: update_borrow_ticket.supplier.supplier_id,
      author_id: update_borrow_ticket.author.author_id,
    };
    try {
      let updated_borrow_ticket = await this.borrowTicketService.UpdateBorrowTicket(update_req)
      this.borrowTicketStore.update({detail_borrow_ticket: updated_borrow_ticket})
      toastr.success("Cập nhật sách thành công.")
      this.router.navigateByUrl('admin/borrow-ticket-management/borrow-ticket-list')
    } catch(e) {
      toastr.error("Cập nhật sách thất bại.", e.msg || e.message)
    }
  }

  async OnFinishBorrowTicket() {
    try {
      const modal = this.modalController.create({
        component: ConfirmFinishBorrowTicketModalComponent,
        componentProps: {
          borrow_ticket_id: this.borrowTicketQuery.getValue().detail_borrow_ticket.borrow_ticket_id
        },
      });
      modal.show().then();
      modal.onDismiss().then(async finish_borrow_ticket_id => {
        if(finish_borrow_ticket_id) {
          try {
            await this.borrowTicketService.FinishBorrowTicket(finish_borrow_ticket_id)
            this.router.navigateByUrl('admin/borrow-ticket-management/borrow-ticket-list')
            toastr.success("Hoàn thành phiếu mượn sách thành công");
          } catch(e) {
            toastr.error("Bạn đã hủy phiếu mượn sách không thành thông", e.msg || e.message)
          }
        }
      });
    } catch(e) {
      toastr.error("Hoàn thành phiếu mượn sách không thành công", e.msg || e.message)
    }
  }

  get author() {
    return  this.borrowTicketQuery.getValue().detail_borrow_ticket.author;
  }

  async openSendEmailModal() {
      const modal = this.modalController.create({
        component: SendEmailModalComponent,
        cssClass: 'modal-lg',
        componentProps: {
        },
      });
      modal.show().then();
      modal.onDismiss().then(async message => {
        if(message) {
          try {
            const customerEmail = this.borrowTicketQuery.getValue().detail_borrow_ticket.customer.email;
            const req = {
              customer_email : customerEmail,
              message: message
            }
            await this.borrowTicketService.SendEmailForLateBorrowTicket(req);
            this.isSendEmail = true;
            toastr.success("Bạn đã gửi email nhắc nhở thành công");
          } catch(e) {
            toastr.error("Bạn đã gửi email nhắc nhở không thành công", e.msg || e.message)
          }
        }
      });

  }
}
